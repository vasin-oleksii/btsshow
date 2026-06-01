<?php

namespace App\Tests\Controller;

use App\Entity\Proprietaire;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class ProprietaireControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $manager;
    private EntityRepository $proprietaireRepository;
    private string $path = '/admin/proprietaire/';

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get('doctrine')->getManager();
        $this->proprietaireRepository = $this->manager->getRepository(Proprietaire::class);

        foreach ($this->proprietaireRepository->findAll() as $object) {
            $this->manager->remove($object);
        }

        $this->manager->flush();
    }

    public function testIndex(): void
    {
        $this->client->followRedirects();
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Proprietaire index');

        // Use the $crawler to perform additional assertions e.g.
        // self::assertSame('Some text on the page', $crawler->filter('.p')->first()->text());
    }

    public function testNew(): void
    {
        $this->markTestIncomplete();
        $this->client->request('GET', sprintf('%snew', $this->path));

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'proprietaire[nom]' => 'Testing',
            'proprietaire[prenom]' => 'Testing',
            'proprietaire[mail]' => 'Testing',
            'proprietaire[tel]' => 'Testing',
            'proprietaire[adresse]' => 'Testing',
            'proprietaire[user]' => 'Testing',
        ]);

        self::assertResponseRedirects($this->path);

        self::assertSame(1, $this->proprietaireRepository->count([]));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new Proprietaire();
        $fixture->setNom('My Title');
        $fixture->setPrenom('My Title');
        $fixture->setMail('My Title');
        $fixture->setTel('My Title');
        $fixture->setAdresse('My Title');
        $fixture->setUser('My Title');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Proprietaire');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new Proprietaire();
        $fixture->setNom('Value');
        $fixture->setPrenom('Value');
        $fixture->setMail('Value');
        $fixture->setTel('Value');
        $fixture->setAdresse('Value');
        $fixture->setUser('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'proprietaire[nom]' => 'Something New',
            'proprietaire[prenom]' => 'Something New',
            'proprietaire[mail]' => 'Something New',
            'proprietaire[tel]' => 'Something New',
            'proprietaire[adresse]' => 'Something New',
            'proprietaire[user]' => 'Something New',
        ]);

        self::assertResponseRedirects('/admin/proprietaire/');

        $fixture = $this->proprietaireRepository->findAll();

        self::assertSame('Something New', $fixture[0]->getNom());
        self::assertSame('Something New', $fixture[0]->getPrenom());
        self::assertSame('Something New', $fixture[0]->getMail());
        self::assertSame('Something New', $fixture[0]->getTel());
        self::assertSame('Something New', $fixture[0]->getAdresse());
        self::assertSame('Something New', $fixture[0]->getUser());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();
        $fixture = new Proprietaire();
        $fixture->setNom('Value');
        $fixture->setPrenom('Value');
        $fixture->setMail('Value');
        $fixture->setTel('Value');
        $fixture->setAdresse('Value');
        $fixture->setUser('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertResponseRedirects('/admin/proprietaire/');
        self::assertSame(0, $this->proprietaireRepository->count([]));
    }
}
