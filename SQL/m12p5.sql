/* 
LoanID	BookTitle	MemberName	LoanDate	ReturnDate	Librarian	LibrarianContact
1	SQL Basics	Anna	2023-01-01	2023-01-15	Sam	9998887770
2	Python Guide	John	2023-02-01	2023-02-15	Lucy	8887776660

Functional Dependancies:
LoanID -> BookTitle, MemberName, LoanDate, ReturnDate, Librarian, LibrarianContact

Transitive Dependency: 
LoanId-> Librarian -> LibrarianContact

Partial Dependancy:
(LoanID, BookTitle) -> MemberName, LoanDate, ReturnDate, Librarian,
LibrarianContact
*/

/* 
1 NF : Table is already in 1 NF
*/

/* 
2 NF:
Eliminate Partial DEpendancy:
(LoanID, BookTitle) -> MemberName, LoanDate, ReturnDate, Librarian,
LibrarianContact

Create new tables as: 
Loan and Book
Loan: LoanID(PK), MemberName, LoanDate, ReturnDate
Book: BookTitle(PK), Librarian, LibrarianContact
LoanDeatils: (LoanID(FK), BookTitle(FK) AS PK)
*/

/*
3 NF:
Eliminate Transitive Dependancy: LoanId-> Librarian -> LibrarianContact

Create new tables as and relation with Book and Loan: 
Librarian: LibrarianID(PK), Librarian, LibrarianContact
Loan: LoanID(PK), MemberName, LoanDate, ReturnDate
Book: BookTitle(PK), LibrarianID(FK)
LoanDeatils: (LoanID(FK), BookTitle(FK) AS PK)
*/

-- Creating Librarian Table
CREATE TABLE Librarian (
    LibrarianID INT PRIMARY KEY,
    Librarian VARCHAR(50),
    LibrarianContact VARCHAR(20)
);

-- Creating Loan Table
CREATE TABLE Loan (
    LoanID INT PRIMARY KEY,
    MemberName VARCHAR(50),
    LoanDate DATE,
    ReturnDate DATE
);

-- Creating Book Table
CREATE TABLE Book (
    BookTitle VARCHAR(100) PRIMARY KEY,
    LibrarianID INT,
    FOREIGN KEY (LibrarianID) REFERENCES Librarian(LibrarianID)
);

-- Creating LoanDetails Table (Composite Primary Key)
CREATE TABLE LoanDetails (
    LoanID INT,
    BookTitle VARCHAR(100),
    PRIMARY KEY (LoanID, BookTitle),
    FOREIGN KEY (LoanID) REFERENCES Loan(LoanID),
    FOREIGN KEY (BookTitle) REFERENCES Book(BookTitle)
);

-- Inserting Data into Librarian Table
INSERT INTO Librarian (LibrarianID, Librarian, LibrarianContact) VALUES
(1, 'Sam', '9998887770'),
(2, 'Lucy', '8887776660');

-- Inserting Data into Loan Table
INSERT INTO Loan (LoanID, MemberName, LoanDate, ReturnDate) VALUES
(1, 'Anna', '2023-01-01', '2023-01-15'),
(2, 'John', '2023-02-01', '2023-02-15'),
(3, 'Anna', '2023-03-01', '2023-03-15');

-- Inserting Data into Book Table
INSERT INTO Book (BookTitle, LibrarianID) VALUES
('SQL Basics', 1),
('Python Guide', 2),
('JavaScript', 1);

-- Inserting Data into LoanDetails Table
INSERT INTO LoanDetails (LoanID, BookTitle) VALUES
(1, 'SQL Basics'),
(2, 'Python Guide'),
(3, 'JavaScript');