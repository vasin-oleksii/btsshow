<?php

namespace App\Form;

use App\Entity\Cour;
use App\Entity\Seance;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SeanceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('date', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('heureDeb', TimeType::class, [
                'widget' => 'single_text',
                'input' => 'datetime',
            ])
            ->add('duree', TimeType::class, [
                'widget' => 'single_text',
                'input' => 'datetime',
            ])
            ->add('cour', EntityType::class, [
                'class' => Cour::class,
                'choice_label' => 'nomCour',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Seance::class,
        ]);
    }
}
