-- CreateTable
CREATE TABLE "CompanyData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "v" REAL NOT NULL,
    "vw" REAL NOT NULL,
    "o" REAL NOT NULL,
    "c" REAL NOT NULL,
    "highestPriceOfTheDay" REAL NOT NULL,
    "lowestPriceOfTheDay" REAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "n" INTEGER NOT NULL
);
