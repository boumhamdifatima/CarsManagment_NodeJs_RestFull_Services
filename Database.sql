-- Création de la base de données
DROP DATABASE IF EXISTS gestionVehicule;
CREATE DATABASE IF NOT EXISTS gestionVehicule;
USE gestionVehicule;

-- Création de la table Véhicule
CREATE TABLE IF NOT EXISTS Vehicule (
    Id CHAR(16) NOT NULL,
    Marque VARCHAR(20),
    Modele VARCHAR(20),
    Annee INT,
    Couleur VARCHAR(20),
    Image VARCHAR(20),
    PRIMARY KEY (Id)
);

-- Insérer des données initiales dans la table Véhicule
INSERT INTO Vehicule (Id, Marque, Modele, Annee, Couleur, Image) VALUES
('0X-432-43955-001', 'Acura', 'ILX', 2008, 'rouge', 'acura_ilx.jpg'),
('0X-432-43955-002', 'Toyota', 'Yaris', 2009, 'bleu', 'toyota.jpg'),
('0X-432-43955-003', 'BMW', 'X3', 2010, 'argent', 'bmw_x3.jpg'),
('0X-432-43955-004', 'BMW', 'X5', 2011, 'noir', 'bmw_x5.jpg'),
('0X-432-43955-005', 'Acura', 'TL', 2012, 'rouge', 'acura_tl.jpg');

