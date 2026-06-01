<?php

namespace App\Controller;

use App\Entity\Inscription;
use App\Form\InscriptionType;
use App\Repository\CourRepository;
use App\Repository\SeanceRepository;
use App\Repository\InscriptionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

final class AccueilController extends AbstractController
{
    #[Route('/', name: 'app_accueil')]
    public function index(): Response
    {
        return $this->render('accueil/index.html.twig');
    }

    #[Route('/liste-des-cours', name: 'app_liste_cours')]
    public function listeCours(CourRepository $repository): Response
    {
        $cours = $repository->findAll();
        return $this->render('accueil/listeCours.html.twig', ['cours' => $cours]);
    }

    #[Route('/details-cour-{id}', name: 'app_details_cour')]
    public function detailsCour(CourRepository $repository, int $id): Response
    {
        $cour = $repository->find($id);
        return $this->render('accueil/detailsCour.html.twig', ['cour' => $cour]);
    }

    #[Route('/liste-des-seances', name: 'app_liste_seances')]
    public function listeSeances(SeanceRepository $repository, Request $request): Response
    {
        $id = $request->query->get('id');
        $seances = $repository->findBy(['cour' => $id]);
        return $this->render('accueil/listeSeances.html.twig', ['seances' => $seances]);
    }

    #[Route('/details-seances-{id}', name: 'app_details_seance')]
    public function seance(int $id, SeanceRepository $repository): Response
    {
        $seance = $repository->find($id);
        
        return $this->render('accueil/detailsSeance.html.twig', [
            'seance' => $seance,
            'seanceId' => $id
        ]);
    }

    #[Route('/ajouter-chien-{seanceId}', name: 'app_ajouter_chien', methods: ['GET', 'POST'])]
    public function ajouterChien(int $seanceId, Request $request, EntityManagerInterface $em, SeanceRepository $seanceRepo): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $seance = $seanceRepo->find($seanceId);
        if (!$seance) {
            throw $this->createNotFoundException('Séance introuvable.');
        }

        $type = strtolower($seance->getCour()->getType()->getLibelleType());
        $count = $seance->getInscriptions()->count();
        
        if ($type === 'individuels' && $count >= 1) {
            $this->addFlash('error', 'Un seul chien par séance');
            return $this->redirectToRoute('app_details_seance', ['id' => $seanceId]);
        }
        
        if (in_array($type, ['collectif', 'collectifs']) && $count >= 15) {
            $this->addFlash('error', 'Séance complète');
            return $this->redirectToRoute('app_details_seance', ['id' => $seanceId]);
        }
        
        $inscription = new Inscription();
        $form = $this->createForm(InscriptionType::class, $inscription, [
            'seance' => $seance,
            'user' => $this->getUser(),
        ]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $inscription->setSeance($seance)->setDateInscription(new \DateTime());
            $em->persist($inscription);
            $em->flush();
            
            $this->addFlash('success', 'Chien inscrit!');
            return $this->redirectToRoute('app_details_seance', ['id' => $seanceId]);
        }
        
        return $this->render('accueil/ajouterChien.html.twig', ['form' => $form, 'seance' => $seance]);
    }

    #[Route('/retirer-chien-{inscriptionId}', name: 'app_retirer_chien')]
    public function retirerChien(int $inscriptionId, EntityManagerInterface $em, InscriptionRepository $inscriptionRepo): Response
    {
        $inscription = $inscriptionRepo->find($inscriptionId);
        if (!$inscription) {
            $this->addFlash('error', 'Non trouvé');
            return $this->redirectToRoute('app_accueil');
        }
        
        $seanceId = $inscription->getSeance()->getId();
        $isOwner = $inscription->getChien()->getProprietaire()->getUser() === $this->getUser();
        
        if (!$isOwner && !$this->isGranted('ROLE_ADMIN')) {
            $this->addFlash('error', 'Non autorisé');
            return $this->redirectToRoute('app_details_seance', ['id' => $seanceId]);
        }
        
        $em->remove($inscription)->flush();
        $this->addFlash('success', 'Chien retiré!');
        return $this->redirectToRoute('app_details_seance', ['id' => $seanceId]);
    }

    #[Route('/a-propos', name: 'app_a_propos')]
    public function aPropos(): Response
    {
        return $this->render('accueil/aPropos.html.twig');
    }
}
