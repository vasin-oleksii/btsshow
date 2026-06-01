<?php

namespace App\DataFixtures;

use App\Entity\Type;
use App\Entity\Niveau;
use App\Entity\Cour;
use App\Entity\Seance;
use App\Entity\User;
use App\Entity\Proprietaire;
use App\Entity\Chien;
use App\Entity\Inscription;
use \DateTime;
use \DateInterval;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BDDFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        //Manager pour chaque class
        $typeRepo = $manager->getRepository(Type::class);
        $niveauRepo = $manager->getRepository(Niveau::class);
        $courRepo = $manager->getRepository(Cour::class);
        $userRepo = $manager->getRepository(User::class);
        $proprietaireRepo = $manager->getRepository(Proprietaire::class);
        $chienRepo = $manager->getRepository(Chien::class);
        $seanceRepo = $manager->getRepository(Seance::class);

        //Tableau de données pour les Types
        $typeData = [
            ["individuels", "1"],
            ["collectifs", "15"]
        ];

        foreach ($typeData as $data) {
            [$libelle, $nb] = $data;

            $type= new Type();
            $type->setLibelleType($libelle)
                ->setNbPlaces($nb);
            $manager->persist($type);
        }

        //Tableau de données pour les Niveaux
        $niveauxData = ["chiot", "débutant", "confirmé"];

        foreach ($niveauxData as $data) {
            $niveau = new Niveau();
            $niveau->setLibelleNiveau($data);
            $manager->persist($niveau);
        }

        $manager->flush();

        //Tableau de données pour les Cours
        $coursData = [
            ['Sociabilisation', 10.4, 'Ceci est la description du Sociabilisation', 'individuels', 'chiot'],
            ['Obeissance', 20.99, 'Ceci est la description du Obeissance', 'collectifs', 'débutant'],
            ['Agility', 0.99, 'Ceci est la description du Agility', 'collectifs', 'confirmé'],
        ];

        foreach ($coursData as $data) {
            [$nom, $prix, $description, $libelleType, $libelleNiveau] = $data;

            //Verification de présence dans BDD
            $type = $typeRepo->findOneBy(['libelleType' => $libelleType]);
            $niveau = $niveauRepo->findOneBy(['libelleNiveau' => $libelleNiveau]);

            $cour = new Cour();
            $cour->setNomCour($nom)
                 ->setDescription($description)
                 ->setPrix($prix)
                 ->setType($type)
                 ->setNiveau($niveau);
            $manager->persist($cour);
        }

        $manager->flush();

        //Tableau de données pour les Seances
        $seancesData = [
            [new \DateTime('2008-09-08'), new \DateTime('14:00'), new \DateInterval('PT1H00M'), 'Sociabilisation'],
            [new \DateTime('2008-09-10'), new \DateTime('19:00'), new \DateInterval('PT1H30M'), 'Sociabilisation'],
            [new \DateTime('2008-09-12'), new \DateTime('8:00'), new \DateInterval('PT2H30M'), 'Obeissance'],
            [new \DateTime('2008-09-12'), new \DateTime('10:00'), new \DateInterval('PT0H30M'), 'Obeissance'],
            [new \DateTime('2008-09-15'), new \DateTime('11:11'), new \DateInterval('PT1H45M'), 'Agility'],
        ];

        foreach ($seancesData as $data) {
            [$date, $heureDeb, $duree, $nomCour] = $data;

            //Verification de présence dans BDD
            $cour = $courRepo->findOneBy(['nomCour' => $nomCour]);

            // Convertir DateInterval en DateTime pour le champ duree
            $dateReference = new \DateTime('00:00');
            $dateReference->add($duree); 

            $seance = new Seance();
            $seance->setDate($date)
                 ->setHeureDeb($heureDeb)
                 ->setDuree($dateReference)
                 ->setCour($cour);
            $manager->persist($seance);
        }

        $manager->flush();

        //Tableau de données pour les Users
        $usersData = [
            ["test@gmail.com", '$2y$13$0GgK5KF1t7mB9FZPse4DvemJkumBntkBtj6VoDA4nWkx/d26mjmhy', ["ROLE_USERS"]], //password : test123
            ["user@gmail.com", '$2y$13$eijWxR0MBJrqnruniWydN.oSW3MEIT5f6P7yWrNHjyKlyoyct35QO', ["ROLE_USERS"]], //password : essai
            ["admin@gmail.com", '$2y$13$oWF.36zexwb8zm.1u3LRROZjUuV/itOaD0DQmjbEzIVgaVjqrlCUe', ["ROLE_ADMIN"]], //password : admin
        ];

        foreach ($usersData as $data) {
            [$login, $pass, $role] = $data;

            $user = new User();
            $user->setEmail($login)
                 ->setPassword($pass)
                 ->setRoles($role);
            $manager->persist($user);
        }

        $manager->flush();

        //Tableau de données pour les Proprios
        $proprietairesData = [
            ["Test", 'Test', "test@gmail.com", "0000000000", "15 rue du test", "test@gmail.com"],
            ["User", 'User', "user@gmail.com", "0000000000", "15 rue du user", "user@gmail.com"],
        ];

        foreach ($proprietairesData as $data) {
            [$nom, $prenom, $mail, $tel, $adresse, $login] = $data;

            //Verification de présence dans BDD
            $user = $userRepo->findOneBy(['email' => $login]);

            $proprio = new Proprietaire();
            $proprio->setNom($nom)
                 ->setPrenom($prenom)
                 ->setMail($mail)
                 ->setTel($tel)
                 ->setAdresse($adresse)
                 ->setUser($user);
            $manager->persist($proprio);
        }

        $manager->flush();

        //Tableau de données pour les Proprios
        $chiensData = [
            ["Golden retriever", 'Tony', 7, "male", "Test"],
            ["Beagle", 'Beag', 6, "male", "Test"],
            ["Husky", 'Taia', 5, "femelle", "User"],
            ["Bulldog", 'Bully', 8, "femelle", "User"],
        ];

        foreach ($chiensData as $data) {
            [$race, $nom, $age, $sexe, $pro] = $data;

            //Verification de présence dans BDD
            $proprio = $proprietaireRepo->findOneBy(['nom' => $pro]);

            $chien = new Chien();
            $chien->setRace($race)
                 ->setNomChien($nom)
                 ->setAge($age)
                 ->setSexe($sexe)
                 ->setProprietaire($proprio);
            $manager->persist($chien);
        }

        $manager->flush();

        //Tableau de données pour les Proprios
        $inscriptionsData = [
            [new \DateTime('2008-08-08'), new \DateTime('2008-09-08'), 'Tony'],
            [new \DateTime('2008-08-08'), new \DateTime('2008-09-12'), 'Taia'],
            [new \DateTime('2008-08-08'), new \DateTime('2008-09-12'), 'Bully'],
        ];

        foreach ($inscriptionsData as $data) {
            [$date, $laSeance, $leChien] = $data;

            //Verification de présence dans BDD
            $chien = $chienRepo->findOneBy(['nomChien' => $leChien]);
            $seance = $seanceRepo->findOneBy(['date' => $laSeance]);

            $inscription = new Inscription();
            $inscription->setDateInscription($date)
                 ->setSeance($seance)
                 ->setChien($chien);
            $manager->persist($inscription);
        }

        $manager->flush();
    }
}
