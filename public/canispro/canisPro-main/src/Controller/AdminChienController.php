<?php

namespace App\Controller;

use App\Entity\Chien;
use App\Form\AdminChienType;
use App\Repository\ChienRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin/chien')]
final class AdminChienController extends AbstractController
{
    #[Route(name: 'app_admin_chien_index', methods: ['GET'])]
    public function listeChiens(ChienRepository $chienRepository): Response
    {
        return $this->render('admin_chien/listeChiens.html.twig', [
            'chiens' => $chienRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_chien_ajout', methods: ['GET', 'POST'])]
    public function ajout(Request $request, EntityManagerInterface $entityManager): Response
    {
        $chien = new Chien();
        $form = $this->createForm(AdminChienType::class, $chien);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($chien);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_chien_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_chien/ajout.html.twig', [
            'chien' => $chien,
            'form' => $form,
        ]);
    }

    #[Route('/modification-{id}', name: 'app_admin_chien_modif', methods: ['GET', 'POST'])]
    public function modif(Request $request, Chien $chien, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(AdminChienType::class, $chien);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_chien_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_chien/modif.html.twig', [
            'chien' => $chien,
            'form' => $form,
        ]);
    }

    #[Route('/supprimer-{id}', name: 'app_admin_chien_delete', methods: ['POST'])]
    public function delete(Request $request, Chien $chien, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$chien->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($chien);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_chien_index', [], Response::HTTP_SEE_OTHER);
    }
}
