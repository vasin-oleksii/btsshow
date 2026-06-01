<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Proprietaire;
use App\Form\ProprietaireType;
use App\Repository\ProprietaireRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/admin/proprietaire')]
final class AdminProprietaireController extends AbstractController
{
    #[Route(name: 'app_admin_proprietaire_index', methods: ['GET'])]
    public function index(ProprietaireRepository $proprietaireRepository): Response
    {
        return $this->render('admin_proprietaire/listeMembres.html.twig', [
            'proprietaires' => $proprietaireRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_proprietaire_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $proprietaire = new Proprietaire();
        $form = $this->createForm(ProprietaireType::class, $proprietaire);
        $form->handleRequest($request);

        $user = new User();

        if ($form->isSubmitted() && $form->isValid()) {

            // Récupérer le mot de passe du formulaire
            $plaintextPassword  = $request->request->get('password');
            
            // Utilisation du service PasswordHasherInterface
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );

            // Définir l'email, le mot de passe et le rôle
            $user->setEmail($proprietaire->getMail());
            $user->setPassword($hashedPassword);
            $user->setRoles(['ROLE_USERS']);

            // Associer l'utilisateur au formulaire (si nécessaire)
            $proprietaire->setUser($user);

            // Persist l'utilisateur et le propriétaire
            $entityManager->persist($user);
            $entityManager->persist($proprietaire);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_proprietaire_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_proprietaire/ajout.html.twig', [
            'proprietaire' => $proprietaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_proprietaire_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Proprietaire $proprietaire, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ProprietaireType::class, $proprietaire);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_proprietaire_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin_proprietaire/modif.html.twig', [
            'proprietaire' => $proprietaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_proprietaire_delete', methods: ['POST','GET'])]
    public function delete(Request $request, Proprietaire $proprietaire, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$proprietaire->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($proprietaire);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_proprietaire_index', [], Response::HTTP_SEE_OTHER);
    }
}
