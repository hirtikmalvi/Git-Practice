/*
Transitive Dependency: 
ManufacturerContact depends on Manufacturer, not directly on ProductID.

New Tables:
Product Table (Stores product information)
Manufacturer Table (Stores manufacturer information)
*/
CREATE TABLE Manufacturer (
    ManufacturerName VARCHAR(50) PRIMARY KEY,
    ManufacturerContact VARCHAR(20)
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    ManufacturerName VARCHAR(50),
    FOREIGN KEY (ManufacturerName) REFERENCES Manufacturer(ManufacturerName)
);

INSERT INTO Manufacturer (ManufacturerName, ManufacturerContact) VALUES
('FarmCo', '12345'),
('FruitCo', '67890');

INSERT INTO Product (ProductID, ProductName, ManufacturerID) VALUES
(1, 'Apple', 'FarmCo'),
(2, 'Banana', 'FruitCo');
