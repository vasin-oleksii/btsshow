# CanisPro Éducation — Symfony / Doctrine ops

Stack: Symfony, PHP 8.x, Doctrine ORM, MySQL, Twig, Bootstrap. Roles: `ROLE_USER`, `ROLE_ADMIN`.

**Seance (this repo)**

- `src/Entity/Seance.php`
- `src/Form/SeanceType.php`
- `src/Controller/AdminSeanceController.php` — routes under `/admin/seance` (`app_admin_seance_index`, `app_admin_seance_ajout`, `app_admin_seance_modif`, `app_admin_seance_delete`)
- `templates/admin_seance/_form.html.twig`, `listeSeances.html.twig`, `ajout.html.twig`, `modif.html.twig`
- `src/Repository/SeanceRepository.php`
- `migrations/`
- `config/packages/security.yaml`

---

## Where to change what

| Task | Location |
|------|----------|
| New column / relation | `src/Entity/<Entity>.php` |
| Queries | `src/Repository/<Entity>Repository.php` |
| HTTP + routes | `src/Controller/*.php` |
| Form fields | `src/Form/<Entity>Type.php` |
| Pages | `templates/**/*.html.twig` |
| DB diff | `php bin/console make:migration` → `migrations/Version*.php` |
| Access | `config/packages/security.yaml` |

---

## Seance CRUD (this controller)

| Action | Method | Doctrine |
|--------|--------|----------|
| List | `AdminSeanceController::listeSeances` — `findBy([], ['date' => 'ASC', 'heureDeb' => 'ASC'])` | read |
| Ajout | `ajout` — `createForm(SeanceType::class, $seance)` | `persist` + `flush` |
| Modif | `modif` — same form on existing `Seance` | `flush` |
| Supprimer | `delete` — CSRF `delete{ id }` | `remove` + `flush` |

---

## Symfony Maker: commands vs manual edits

| Goal | Command | What Maker writes |
|------|---------|-------------------|
| New field / relation on an entity | `php bin/console make:entity Seance` | Property, `#[ORM\…]`, getters/setters (+ inverse relation if you answer yes) |
| Migration SQL from mapping vs DB | `php bin/console make:migration` | `migrations/Version*.php` — **read before** `migrate` |
| Apply DB changes | `php bin/console doctrine:migrations:migrate` | Executes migration |
| Scaffold CRUD | `php bin/console make:crud Seance` | Controller + Form + Twig — **can overwrite** existing code; avoid on this project if you already use `AdminSeanceController` |
| New empty form class | `php bin/console make:form` | New `*Type.php` — does **not** add one line into your current `SeanceType` |

**CanisPro:** use **Maker for entity + migrations**. **Form / Twig / fixtures** stay manual: Symfony has no built-in command that inserts a single `form_row` into `templates/admin_seance/_form.html.twig`.

---

## Example: add `placesMax` on `Seance` (entity via Maker)

**1. Entity (Maker — no hand-written property):**

```bash
cd /Users/vasin/Desktop/canisPro
php bin/console make:entity Seance
```

Typical answers (labels may differ slightly by version):

- API Platform resource? → **no**
- Add field to `Seance`? → **yes**
- Field name → **`placesMax`**
- Type → **`integer`** (use **`?`** for the full list if needed)
- Nullable? → **yes** / **no**
- Add another field? → **no**

Result: `src/Entity/Seance.php` updated by Maker.

**2. DB (commands only):**

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

Open the generated `migrations/Version*.php` and confirm `ADD` column, then migrate.

**3. UI + data (manual — no Maker for these in your layout):**

- `src/Form/SeanceType.php` — `use IntegerType;` + `->add('placesMax', IntegerType::class, ['required' => false, 'label' => 'Places maximum', …])` after `duree`, before `cour`.
- `templates/admin_seance/_form.html.twig` — `form_row(form.placesMax, …)` like other fields.
- `templates/admin_seance/listeSeances.html.twig` — `<th>Places max</th>`, cell `{{ seance.placesMax ?? '—' }}`, empty row `colspan` **7 → 8**.
- `src/DataFixtures/BDDFixtures.php` — optional `->setPlacesMax(10)` after `setCour`.

**4. Optional:** `#[Assert\PositiveOrZero]` on `$placesMax` in the entity file. Controller unchanged if only `SeanceType` binds the field.

---

## Example: remove `placesMax` from `Seance`

Maker does **not** remove fields in the standard wizard — delete the mapping in PHP, then use migrations.

1. Edit **`src/Entity/Seance.php`** — remove `$placesMax` + getter/setter.
2. Remove usages: `SeanceType`, `_form.html.twig`, `listeSeances.html.twig`, `BDDFixtures.php`.
3. **Commands:**

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

Check migration for `DROP` column. Grep: `placesMax`, `places_max`.

---

## `Seance` → `Cour` (already wired in CanisPro)

**Entity `src/Entity/Seance.php`:**

```php
    #[ORM\ManyToOne(inversedBy: 'seances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cour $cour = null;
```

**Entity `src/Entity/Cour.php`:** `OneToMany` `Seance`, `mappedBy: 'cour'`.

**Form `src/Form/SeanceType.php`:**

```php
            ->add('cour', EntityType::class, [
                'class' => Cour::class,
                'choice_label' => 'nomCour',
            ])
```

**Twig:** `{{ seance.cour ? seance.cour.nomCour : '-' }}` (`listeSeances.html.twig`). Public side uses `seance.cour.nomCour`, `seance.cour.type`, etc. — `templates/accueil/detailsSeance.html.twig`, `templates/accueil/listeSeances.html.twig`.

**If you recreated it from zero (all via Maker on `Seance`):**

```bash
php bin/console make:entity Seance
```

- Add field? → **relation**
- Relation type → **ManyToOne**
- Class to relate → **`Cour`**
- Nullable? → **no** (same as `JoinColumn(nullable: false)` in this project)
- Add inverse on `Cour`? → **yes** (`mappedBy` / `inversedBy` generated)
- Then:

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

Then wire **`EntityType`** in `SeanceType` and Twig as in the snippets above (Maker does not build your admin Twig).

---

## Example: remove `Seance` ↔ `Cour` relation (destructive)

Only if you really drop the FK — you must strip **all** usages.

1. `src/Entity/Seance.php` — remove `$cour`, `getCour` / `setCour`, `#[ORM\ManyToOne]` / `JoinColumn`.
2. `src/Entity/Cour.php` — remove `$seances` collection + `addSeance` / `removeSeance` / `getSeances` and the `OneToMany` attribute.
3. `src/Form/SeanceType.php` — remove `->add('cour', EntityType::class, ...)`.
4. **Twig:** `templates/admin_seance/_form.html.twig` (`form.cour`), `templates/admin_seance/listeSeances.html.twig` (cours column), `templates/accueil/detailsSeance.html.twig`, `templates/accueil/listeSeances.html.twig` — anything `seance.cour`.
5. **Fixtures / controllers** that call `setCour` on `Seance`.
6. `php bin/console make:migration` + `doctrine:migrations:migrate` — FK `cour_id` dropped on `seance`.
7. MySQL: `SHOW CREATE TABLE seance;`

---

## `Inscription` (dog ↔ session)

- `Inscription` → `ManyToOne` `Seance`, `ManyToOne` `Chien`
- `Seance` / `Chien` → `OneToMany` `Inscription`

---

## Relations reference

| Link | Doctrine |
|------|----------|
| Cour — Type | Cour ManyToOne Type · Type OneToMany Cour |
| Cour — Niveau | Cour ManyToOne Niveau · Niveau OneToMany Cour |
| Cour — Seance | Cour OneToMany Seance · Seance ManyToOne Cour |
| Seance — Inscription | Seance OneToMany Inscription · Inscription ManyToOne Seance |
| Chien — Inscription | Chien OneToMany Inscription · Inscription ManyToOne Chien |
| Proprietaire — Chien | Proprietaire OneToMany Chien · Chien ManyToOne Proprietaire |
| User — Proprietaire | User OneToOne Proprietaire · Proprietaire OneToOne User |

---

## Security (short)

- Admin: `denyAccessUnlessGranted('ROLE_ADMIN')` on `AdminSeanceController` methods.
- Delete: POST + `csrf_token('delete' ~ seance.id)` — checked in `delete()` with `$request->getPayload()->getString('_token')`.
- Twig: `{{ ... }}` escaped by default.

---

## Commands

```bash
cd /Users/vasin/Desktop/canisPro

composer install
symfony server:start

# Entity fields / relations (interactive — prefer this over copying PHP)
php bin/console make:entity Seance

php bin/console make:controller
php bin/console make:form
# make:crud — only on greenfield; can overwrite existing admin code

php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load

php bin/console cache:clear
```

---

## Doctrine

```php
$em->persist($entity);
$em->flush();
$em->remove($entity);
$repo->find($id);
$repo->findAll();
```
