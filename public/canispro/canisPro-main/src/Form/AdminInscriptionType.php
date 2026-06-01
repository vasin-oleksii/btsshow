<?php

namespace App\Form;

use App\Entity\Chien;
use App\Entity\Inscription;
use App\Entity\Seance;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdminInscriptionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        if ($options['show_date']) {
            $builder->add('dateInscription', DateType::class, [
                'widget' => 'single_text',
                'label' => 'Date de l\'inscription',
            ]);
        } else {
            $builder->add('dateInscription', DateType::class, [
                'widget' => 'single_text',
                'data' => new \DateTime(),
                'attr' => ['hidden' => true],
            ]);
        }

        $builder
            ->add('seance', EntityType::class, [
                'class' => Seance::class,
                'choice_label' => function (Seance $seance) {
                    $coursNom = $seance->getCour() ? $seance->getCour()->getNomCour() : 'Cours inconnu';
                    $date = $seance->getDate() ? $seance->getDate()->format('d/m/Y') : 'Date inconnue';
                    return sprintf('Séance %d - %s (%s)', $seance->getId(), $coursNom, $date);
                },
                'placeholder' => 'Choisissez une séance',
            ])
            ->add('chien', EntityType::class, [
                'class' => Chien::class,
                'choice_label' => function (Chien $chien) {
                    $proprio = $chien->getProprietaire() ? $chien->getProprietaire()->getMail() : 'Aucun';
                    return sprintf('Chien %d - %s (%s)', $chien->getId(), $chien->getNomChien(), $proprio);
                },
                'placeholder' => 'Choisissez un chien',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Inscription::class,
            'show_date' => false,
        ]);
    }
}