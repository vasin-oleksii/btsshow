<?php

namespace App\Form;

use App\Entity\Chien;
use App\Entity\Proprietaire;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdminChienType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('race')
            ->add('nomChien')
            ->add('age')
            ->add('sexe')
            ->add('proprietaire', EntityType::class, [
                'class' => Proprietaire::class,
                'choice_label' => function (Proprietaire $proprietaire) {
                    return sprintf('%d - %s (%s)', $proprietaire->getId(), $proprietaire->getNom(), $proprietaire->getMail());
                },
                'placeholder' => 'Choisissez un propriétaire',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Chien::class,
        ]);
    }
}
