<?php

namespace App\Controller;

use \DateTime;
use App\Entity\Inscription;
use App\Form\AdminInscriptionType;
use App\Repository\InscriptionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/inscription')]
final class AdminInscriptionController extends AbstractController
{
    #[Route(name: 'app_admin_inscription_index', methods: ['GET'])]
    public function listeInscriptions(InscriptionRepository $inscriptionRepository): Response
    {
        return $this->render('admin_inscription/listeInscriptions.html.twig', [
            'inscriptions' => $inscriptionRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_inscription_ajout', methods: ['GET', 'POST'])]
    public function ajout(Request $request, EntityManagerInterface $entityManager): Response
    {
        $inscription = new Inscription();
        $inscription->setDateInscription(new \DateTime());
        $form = $this->createForm(AdminInscriptionType::class, $inscription, ['show_date' => false,]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($inscription);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_inscription_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_inscription/ajout.html.twig', [
            'inscription' => $inscription,
            'form' => $form,
            'show_date' => false,
        ]);
    }

    #[Route('/modification-{id}', name: 'app_admin_inscription_modif', methods: ['GET', 'POST'])]
    public function modif(Request $request, Inscription $inscription, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(AdminInscriptionType::class, $inscription, ['show_date' => true,]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_inscription_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_inscription/modif.html.twig', [
            'inscription' => $inscription,
            'form' => $form,
            'show_date' => true,
        ]);
    }

    #[Route('/supprimer-{id}', name: 'app_admin_inscription_delete', methods: ['POST'])]
    public function delete(Request $request, Inscription $inscription, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$inscription->getId(), $request->request->get('_token'))) {
            $entityManager->remove($inscription);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_inscription_index', [], Response::HTTP_SEE_OTHER);
    }
}