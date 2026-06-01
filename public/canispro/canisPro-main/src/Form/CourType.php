<?php

namespace App\Form;

use App\Entity\Cour;
use App\Entity\Niveau;
use App\Entity\Type;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CourType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nomCour')
            ->add('description')
            ->add('prix')
            ->add('type', EntityType::class, [
                'class' => Type::class,
                'choice_label' => function (Type $type) {
                    return sprintf('%d - %s', $type->getId(), $type->getLibelleType());
                },
                'placeholder' => 'Choisissez un type',
            ])
            ->add('niveau', EntityType::class, [
                'class' => Niveau::class,
                'choice_label' => function (Niveau $niveau) {
                    return sprintf('%d - %s', $niveau->getId(), $niveau->getLibelleNiveau());
                },
                'placeholder' => 'Choisissez un niveau',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Cour::class,
        ]);
    }
}
