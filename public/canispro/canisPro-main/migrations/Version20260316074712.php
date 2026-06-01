<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260316074712 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE chien (id INT AUTO_INCREMENT NOT NULL, race VARCHAR(255) NOT NULL, nom_chien VARCHAR(255) NOT NULL, age SMALLINT NOT NULL, sexe VARCHAR(7) NOT NULL, proprietaire_id INT NOT NULL, INDEX IDX_13A4067E76C50E4A (proprietaire_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE cour (id INT AUTO_INCREMENT NOT NULL, nom_cour VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, type_id INT NOT NULL, niveau_id INT NOT NULL, INDEX IDX_A71F964FC54C8C93 (type_id), INDEX IDX_A71F964FB3E9C81 (niveau_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE inscription (id INT AUTO_INCREMENT NOT NULL, date_inscription DATE NOT NULL, seance_id INT NOT NULL, chien_id INT NOT NULL, INDEX IDX_5E90F6D6E3797A94 (seance_id), INDEX IDX_5E90F6D6BFCF400E (chien_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE niveau (id INT AUTO_INCREMENT NOT NULL, libelle_niveau VARCHAR(8) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE proprietaire (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, tel VARCHAR(10) DEFAULT NULL, adresse VARCHAR(255) NOT NULL, user_id INT NOT NULL, UNIQUE INDEX UNIQ_69E399D6A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE seance (id INT AUTO_INCREMENT NOT NULL, date DATE NOT NULL, heure_deb TIME NOT NULL, duree TIME NOT NULL, cour_id INT NOT NULL, INDEX IDX_DF7DFD0EB7942F03 (cour_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE type (id INT AUTO_INCREMENT NOT NULL, libelle_type VARCHAR(11) NOT NULL, nb_places SMALLINT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE chien ADD CONSTRAINT FK_13A4067E76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES proprietaire (id)');
        $this->addSql('ALTER TABLE cour ADD CONSTRAINT FK_A71F964FC54C8C93 FOREIGN KEY (type_id) REFERENCES type (id)');
        $this->addSql('ALTER TABLE cour ADD CONSTRAINT FK_A71F964FB3E9C81 FOREIGN KEY (niveau_id) REFERENCES niveau (id)');
        $this->addSql('ALTER TABLE inscription ADD CONSTRAINT FK_5E90F6D6E3797A94 FOREIGN KEY (seance_id) REFERENCES seance (id)');
        $this->addSql('ALTER TABLE inscription ADD CONSTRAINT FK_5E90F6D6BFCF400E FOREIGN KEY (chien_id) REFERENCES chien (id)');
        $this->addSql('ALTER TABLE proprietaire ADD CONSTRAINT FK_69E399D6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE seance ADD CONSTRAINT FK_DF7DFD0EB7942F03 FOREIGN KEY (cour_id) REFERENCES cour (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE chien DROP FOREIGN KEY FK_13A4067E76C50E4A');
        $this->addSql('ALTER TABLE cour DROP FOREIGN KEY FK_A71F964FC54C8C93');
        $this->addSql('ALTER TABLE cour DROP FOREIGN KEY FK_A71F964FB3E9C81');
        $this->addSql('ALTER TABLE inscription DROP FOREIGN KEY FK_5E90F6D6E3797A94');
        $this->addSql('ALTER TABLE inscription DROP FOREIGN KEY FK_5E90F6D6BFCF400E');
        $this->addSql('ALTER TABLE proprietaire DROP FOREIGN KEY FK_69E399D6A76ED395');
        $this->addSql('ALTER TABLE seance DROP FOREIGN KEY FK_DF7DFD0EB7942F03');
        $this->addSql('DROP TABLE chien');
        $this->addSql('DROP TABLE cour');
        $this->addSql('DROP TABLE inscription');
        $this->addSql('DROP TABLE niveau');
        $this->addSql('DROP TABLE proprietaire');
        $this->addSql('DROP TABLE seance');
        $this->addSql('DROP TABLE type');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
