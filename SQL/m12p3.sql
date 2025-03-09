-- Primary Key (Candidate Key): (OrderID, Product)
-- Here Customer Only depends on Orderid only.
-- PArtial Dependancy: OrderID -> Customer. 

-- New Tables AS: Orders and OrderDetails
-- Order Table Will have attributes, Orderid(PK) and Customer.
-- Whereas Orderdetails will have Orderid (FK),Product and Quantity

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    Customer VARCHAR(50)
);

CREATE TABLE OrderDetails (
    OrderID INT,
    Product VARCHAR(50),
    Quantity INT,
    PRIMARY KEY (OrderID, Product),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

INSERT INTO Orders (OrderID, Customer) VALUES
(1, 'John'),
(2, 'Mary');

INSERT INTO OrderDetails (OrderID, Product, Quantity) VALUES
(1, 'Apple', 10),
(1, 'Orange', 5),
(2, 'Banana', 20);
