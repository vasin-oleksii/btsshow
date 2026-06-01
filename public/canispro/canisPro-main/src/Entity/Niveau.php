<?php

namespace App\Entity;

use App\Repository\NiveauRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NiveauRepository::class)]
class Niveau
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 8)]
    private ?string $libelleNiveau = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelleNiveau(): ?string
    {
        return $this->libelleNiveau;
    }

    public function setLibelleNiveau(string $libelleNiveau): static
    {
        $this->libelleNiveau = $libelleNiveau;

        return $this;
    }
}
