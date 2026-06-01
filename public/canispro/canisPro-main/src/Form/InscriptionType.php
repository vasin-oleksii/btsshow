<?php

namespace App\Form;

use App\Entity\Chien;
use App\Entity\Inscription;
use App\Repository\ChienRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\User\UserInterface;

class InscriptionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $seance = $options['seance'];
        $user = $options['user'];
        
        $builder
            ->add('chien', EntityType::class, [
                'class' => Chien::class,
                'choice_label' => 'nomChien',
                'label' => 'Choisir votre chien',
                'query_builder' => function (ChienRepository $repo) use ($seance, $user) {
                    $qb = $repo->createQueryBuilder('c')
                        ->leftJoin('c.inscriptions', 'i', 'WITH', 'i.seance = :seance')
                        ->join('c.proprietaire', 'p')
                        ->where('i.id IS NULL')
                        ->setParameter('seance', $seance)
                        ->orderBy('c.nomChien', 'ASC');

                    if ($user instanceof UserInterface) {
                        $qb->andWhere('p.user = :user')
                           ->setParameter('user', $user);
                    } else {
                        $qb->andWhere('1 = 0');
                    }

                    return $qb;
                }
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Inscription::class,
            'seance' => null,
            'user' => null,
        ]);

        $resolver->setAllowedTypes('user', ['null', UserInterface::class]);
    }
}
