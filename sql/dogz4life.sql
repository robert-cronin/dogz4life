CREATE TABLE IF NOT EXISTS "user" (
	"USER_ID"	TEXT NOT NULL UNIQUE,
	"CUSTOMER_ID"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("USER_ID")
);
CREATE TABLE IF NOT EXISTS "pet" (
	"id"	INTEGER NOT NULL UNIQUE,
	"CUSTOMER_ID"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"gender"	TEXT NOT NULL,
	"desexed"	INTEGER,
	"weight"	REAL,
	"coatColor"	TEXT,
	"birthday"	TEXT,
	"allergies"	TEXT,
	"additionalGeneralNotes"	TEXT,
	"vaccinationRecord"	TEXT,
	"dateAdministered"	TEXT,
	"dateNextDue"	TEXT,
	"healthFlags"	TEXT,
	"additionalHealthNotes"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("CUSTOMER_ID") REFERENCES "user"("CUSTOMER_ID")
);
