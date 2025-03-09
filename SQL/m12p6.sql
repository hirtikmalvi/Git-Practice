/*
Update Anomaly occur as Changing Branch Address will require change in multiple rows.
Insert Anomaly occur as will not be able to add a new branch address without an transaction. all the fileds except branch will be null
Delete Anomaly will occur as Deleting a transaction may lose branch details.

After Normalising The table, new table will be created as:
Branch: BRanchID(PK), BranchAddress
Accouts: AccountID(PK), AccountHolderName, BranchID(FK), AccountBalance
Transactions: TransactionID(PK), AccountID(FK), TransactionAmount
*/


CREATE TABLE Branch (
    BranchID INT PRIMARY KEY,
    BranchAddress VARCHAR(100)
);

CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY,
    AccountHolderName VARCHAR(50),
    BranchID INT,
    AccountBalance DECIMAL(10,2),
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    AccountID INT,
    TransactionAmount DECIMAL(10,2),
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

INSERT INTO Branch (BranchID, BranchAddress) VALUES
(1, 'Street 12, NY'),
(2, 'Street 34, LA');

INSERT INTO Accounts (AccountID, AccountHolderName, BranchID) VALUES
(1, 'Ali', 1,5000),
(2, 'Sara', 2, 8000);

INSERT INTO Transactions (TransactionID, AccountID, TransactionAmount, AccountBalance) VALUES
(1, 1, 1000),
(2, 2, 1500);