<?php

namespace App\Tests\Controller;

use App\Entity\Cour;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class CourControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $manager;
    private EntityRepository $courRepository;
    private string $path = '/admin/cour/';

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get('doctrine')->getManager();
        $this->courRepository = $this->manager->getRepository(Cour::class);

        foreach ($this->courRepository->findAll() as $object) {
            $this->manager->remove($object);
        }

        $this->manager->flush();
    }

    public function testIndex(): void
    {
        $this->client->followRedirects();
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Cour index');

        // Use the $crawler to perform additional assertions e.g.
        // self::assertSame('Some text on the page', $crawler->filter('.p')->first()->text());
    }

    public function testNew(): void
    {
        $this->markTestIncomplete();
        $this->client->request('GET', sprintf('%snew', $this->path));

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'cour[nomCour]' => 'Testing',
            'cour[description]' => 'Testing',
            'cour[prix]' => 'Testing',
            'cour[type]' => 'Testing',
            'cour[niveau]' => 'Testing',
        ]);

        self::assertResponseRedirects($this->path);

        self::assertSame(1, $this->courRepository->count([]));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new Cour();
        $fixture->setNomCour('My Title');
        $fixture->setDescription('My Title');
        $fixture->setPrix('My Title');
        $fixture->setType('My Title');
        $fixture->setNiveau('My Title');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Cour');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new Cour();
        $fixture->setNomCour('Value');
        $fixture->setDescription('Value');
        $fixture->setPrix('Value');
        $fixture->setType('Value');
        $fixture->setNiveau('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'cour[nomCour]' => 'Something New',
            'cour[description]' => 'Something New',
            'cour[prix]' => 'Something New',
            'cour[type]' => 'Something New',
            'cour[niveau]' => 'Something New',
        ]);

        self::assertResponseRedirects('/admin/cour/');

        $fixture = $this->courRepository->findAll();

        self::assertSame('Something New', $fixture[0]->getNomCour());
        self::assertSame('Something New', $fixture[0]->getDescription());
        self::assertSame('Something New', $fixture[0]->getPrix());
        self::assertSame('Something New', $fixture[0]->getType());
        self::assertSame('Something New', $fixture[0]->getNiveau());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();
        $fixture = new Cour();
        $fixture->setNomCour('Value');
        $fixture->setDescription('Value');
        $fixture->setPrix('Value');
        $fixture->setType('Value');
        $fixture->setNiveau('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertResponseRedirects('/admin/cour/');
        self::assertSame(0, $this->courRepository->count([]));
    }
}
