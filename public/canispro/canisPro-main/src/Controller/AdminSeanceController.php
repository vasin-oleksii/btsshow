<?php

namespace App\Controller;

use App\Entity\Seance;
use App\Form\SeanceType;
use App\Repository\SeanceRepository;
use Doctrine\DBAL\Exception\ForeignKeyConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/seance')]
final class AdminSeanceController extends AbstractController
{
    #[Route(name: 'app_admin_seance_index', methods: ['GET'])]
    public function listeSeances(SeanceRepository $seanceRepository): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        return $this->render('admin_seance/listeSeances.html.twig', [
            'seances' => $seanceRepository->findBy([], ['date' => 'ASC', 'heureDeb' => 'ASC']),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_seance_ajout', methods: ['GET', 'POST'])]
    public function ajout(Request $request, EntityManagerInterface $entityManager): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $seance = new Seance();
        $form = $this->createForm(SeanceType::class, $seance);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($seance);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_seance_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_seance/ajout.html.twig', [
            'seance' => $seance,
            'form' => $form,
        ]);
    }

    #[Route('/modification-{id}', name: 'app_admin_seance_modif', requirements: ['id' => '\\d+'], methods: ['GET', 'POST'])]
    public function modif(Request $request, Seance $seance, EntityManagerInterface $entityManager): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $form = $this->createForm(SeanceType::class, $seance);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_seance_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_seance/modif.html.twig', [
            'seance' => $seance,
            'form' => $form,
        ]);
    }

    #[Route('/supprimer-{id}', name: 'app_admin_seance_delete', requirements: ['id' => '\\d+'], methods: ['POST'])]
    public function delete(Request $request, Seance $seance, EntityManagerInterface $entityManager): Response
    {  
        if ($this->isCsrfTokenValid('delete'.$seance->getId(), $request->getPayload()->getString('_token'))) {
                $entityManager->remove($seance);
                $entityManager->flush();
                $this->addFlash('success', 'Séance supprimée avec succès.');
        } else {
            $this->addFlash('danger', 'Erreur lors de la suppression.');
        }

        return $this->redirectToRoute('app_admin_seance_index', [], Response::HTTP_SEE_OTHER);
    }
}
