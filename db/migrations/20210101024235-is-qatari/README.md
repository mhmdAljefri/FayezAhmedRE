# Migration `20210101024235-is-qatari`

This migration has been generated by Hassan Alattas at 1/1/2021, 5:42:35 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."REQUEST_TYPES" AS ENUM ('flights', 'hotels', 'cars', 'consultings', 'enquire')

CREATE TYPE "public"."EXPLOAR_TYPES" AS ENUM ('dontMissitGallery', 'getInspiredGallery', 'exploreGallery')

CREATE TYPE "public"."STATUS" AS ENUM ('completed', 'inprogress', 'resell', 'installment', 'compatible_installment', 'ocean_view', 'granted_by_gov')

CREATE TYPE "public"."PAYMENT_TYPES" AS ENUM ('cash', 'installment')

CREATE TABLE "User" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT E'user',

    PRIMARY KEY ("id")
)

CREATE TABLE "Session" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "Project" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentType" "PAYMENT_TYPES" NOT NULL DEFAULT E'cash',
    "status" "STATUS" NOT NULL DEFAULT E'inprogress',
    "countryId" INTEGER NOT NULL,
    "cityId" INTEGER,
    "propertyTypeId" INTEGER,
    "isHousingComplex" BOOLEAN NOT NULL DEFAULT false,
    "housingComplexText" TEXT,
    "housingComplexImage" TEXT,
    "name" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "subTitle" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "complationDate" TIMESTAMP(3),
    "image" TEXT NOT NULL,
    "mainVideo" TEXT,
    "mainVideoPreview" TEXT,
    "gallery" TEXT[],
    "floorplan" TEXT[],
    "features" TEXT[],
    "brochure" TEXT,
    "constructingUpdateVideo" TEXT,
    "constructingUpdatePrview" TEXT,
    "nearBy" JSONB,
    "location" JSONB,
    "installmentPlan" JSONB,
    "locationText" TEXT,
    "oprationCompanies" JSONB,

    PRIMARY KEY ("id")
)

CREATE TABLE "OprationCompanyPage" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "galleryImages" TEXT[],
    "video" TEXT,
    "constructingUpdateVideo" TEXT,
    "constructingUpdatePrview" TEXT,
    "oprationCompanies" JSONB,

    PRIMARY KEY ("id")
)

CREATE TABLE "Offer" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentType" "PAYMENT_TYPES" NOT NULL DEFAULT E'cash',
    "status" "STATUS" NOT NULL DEFAULT E'inprogress',
    "countryId" INTEGER NOT NULL,
    "projectId" INTEGER,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "image" TEXT,
    "mainVideo" TEXT,
    "gallery" TEXT[],
    "features" TEXT[],
    "brochure" TEXT,
    "constructingUpdateVideo" TEXT,
    "constructingUpdatePrview" TEXT,
    "location" JSONB,
    "installmentPlan" JSONB,

    PRIMARY KEY ("id")
)

CREATE TABLE "PropertyType" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "RoomWithPrice" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "room" TEXT,
"value" SERIAL,
    "price" TEXT NOT NULL,
    "priceQatar" TEXT NOT NULL,
    "priceTurkey" TEXT NOT NULL,
    "priceKSA" TEXT NOT NULL,
    "priceKuwait" TEXT NOT NULL,
    "priceUAE" TEXT NOT NULL,
    "priceOman" TEXT NOT NULL,
    "projectId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "Country" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "nameEN" TEXT,
    "image" TEXT NOT NULL,
    "gallery" JSONB,
    "isTurkey" BOOLEAN NOT NULL DEFAULT false,
    "isQatari" BOOLEAN NOT NULL DEFAULT false,
    "rooms" TEXT[],
    "carouselImages" TEXT[],

    PRIMARY KEY ("id")
)

CREATE TABLE "City" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "latituade" TEXT,
    "longitude" TEXT,
    "countryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Contact" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phones" TEXT[],
    "mobiles" TEXT[],
    "locationObject" JSONB NOT NULL,
    "countryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Furnish" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "furnishCategoryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "FurnishCategory" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Feature" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Partner" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Carousel" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
"position" SERIAL,
    "title" TEXT,
    "text" TEXT,
    "url" TEXT,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Explore" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EXPLOAR_TYPES" NOT NULL DEFAULT E'dontMissitGallery',
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "videoUrl" TEXT,
    "countryId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "Request" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "REQUEST_TYPES" NOT NULL DEFAULT E'flights',
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "data" JSONB NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

CREATE UNIQUE INDEX "Offer.name_unique" ON "Offer"("name")

CREATE UNIQUE INDEX "PropertyType.name_unique" ON "PropertyType"("name")

CREATE UNIQUE INDEX "Country.name_unique" ON "Country"("name")

CREATE UNIQUE INDEX "City.name_unique" ON "City"("name")

CREATE UNIQUE INDEX "Contact.name_unique" ON "Contact"("name")

CREATE UNIQUE INDEX "FurnishCategory.name_unique" ON "FurnishCategory"("name")

CREATE UNIQUE INDEX "Carousel.position_unique" ON "Carousel"("position")

CREATE UNIQUE INDEX "Explore.title_unique" ON "Explore"("title")

ALTER TABLE "Session" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("cityId")REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("propertyTypeId")REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "OprationCompanyPage" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Offer" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Offer" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "RoomWithPrice" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "City" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Contact" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Furnish" ADD FOREIGN KEY("furnishCategoryId")REFERENCES "FurnishCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Explore" ADD FOREIGN KEY("countryId")REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201226193518..20210101024235-is-qatari
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,9 +12,9 @@
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
+  id             Int       @id @default(autoincrement())
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
   name           String?
   email          String    @unique
@@ -23,9 +23,9 @@
   sessions       Session[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @id @default(autoincrement())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
@@ -37,243 +37,246 @@
   privateData        String?
 }
 model Project {
-  id                        Int             @default(autoincrement()) @id
-  createdAt                 DateTime        @default(now())
-  updatedAt                 DateTime        @updatedAt
-  paymentType               PAYMENT_TYPES   @default(cash)
-  status                    STATUS          @default(inprogress)
-  country                   Country         @relation(fields: [countryId], references: [id])
-  countryId                 Int
-  city                      City?           @relation(fields: [cityId], references: [id])
-  cityId                    Int?
-  propertyType              PropertyType?   @relation(fields: [propertyTypeId], references: [id])
-  propertyTypeId            Int?
-  isHousingComplex          Boolean         @default(false)
-  housingComplexText        String?
-  housingComplexImage       String?
-  name                      String
-  views                     Int             @default(0)
-  subTitle                  String
-  details                   String
-  complationDate            DateTime?
-  image                     String
-  mainVideo                 String?
-  mainVideoPreview          String?
-  gallery                   String[]
-  floorplan                 String[]
-  features                  String[]
-  brochure                  String?
-  constructingUpdateVideo   String?
-  constructingUpdatePrview  String?
-  nearBy                    Json?
-  roomsWithPrices           RoomWithPrice[]
-  location                  Json?
-  installmentPlan           Json?
-  locationText              String?
-  oprationCompanies         Json?
+  id                       Int             @id @default(autoincrement())
+  createdAt                DateTime        @default(now())
+  updatedAt                DateTime        @updatedAt
+  paymentType              PAYMENT_TYPES   @default(cash)
+  status                   STATUS          @default(inprogress)
+  country                  Country         @relation(fields: [countryId], references: [id])
+  countryId                Int
+  city                     City?           @relation(fields: [cityId], references: [id])
+  cityId                   Int?
+  propertyType             PropertyType?   @relation(fields: [propertyTypeId], references: [id])
+  propertyTypeId           Int?
+  isHousingComplex         Boolean         @default(false)
+  housingComplexText       String?
+  housingComplexImage      String?
+  name                     String
+  views                    Int             @default(0)
+  subTitle                 String
+  details                  String
+  complationDate           DateTime?
+  image                    String
+  mainVideo                String?
+  mainVideoPreview         String?
+  gallery                  String[]
+  floorplan                String[]
+  features                 String[]
+  brochure                 String?
+  constructingUpdateVideo  String?
+  constructingUpdatePrview String?
+  nearBy                   Json?
+  roomsWithPrices          RoomWithPrice[]
+  location                 Json?
+  installmentPlan          Json?
+  locationText             String?
+  oprationCompanies        Json?
+  Offer                    Offer[]
 }
 model OprationCompanyPage {
-  id                        Int             @default(autoincrement()) @id
-  createdAt                 DateTime        @default(now())
-  updatedAt                 DateTime        @updatedAt
-  country                   Country         @relation(fields: [countryId], references: [id])
-  countryId                 Int
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  country   Country  @relation(fields: [countryId], references: [id])
+  countryId Int
-  title                     String
-  description               String
-  image                     String
-  galleryImages             String[]
-  video                     String?
-  constructingUpdateVideo   String?
-  constructingUpdatePrview  String?
-  oprationCompanies         Json?
+  title                    String
+  description              String
+  image                    String
+  galleryImages            String[]
+  video                    String?
+  constructingUpdateVideo  String?
+  constructingUpdatePrview String?
+  oprationCompanies        Json?
 }
 model Offer {
-  id                        Int             @default(autoincrement()) @id
-  createdAt                 DateTime        @default(now())
-  updatedAt                 DateTime        @updatedAt
-  paymentType               PAYMENT_TYPES   @default(cash)
-  status                    STATUS          @default(inprogress)
-  country                   Country         @relation(fields: [countryId], references: [id])
-  countryId                 Int
-  project                   Project?        @relation(fields: [projectId], references: [id])
-  projectId                 Int?
+  id          Int           @id @default(autoincrement())
+  createdAt   DateTime      @default(now())
+  updatedAt   DateTime      @updatedAt
+  paymentType PAYMENT_TYPES @default(cash)
+  status      STATUS        @default(inprogress)
+  country     Country       @relation(fields: [countryId], references: [id])
+  countryId   Int
+  project     Project?      @relation(fields: [projectId], references: [id])
+  projectId   Int?
-  name                      String          @unique
-  details                   String
-  image                     String?
-  mainVideo                 String?
-  gallery                   String[]
-  features                  String[]
-  brochure                  String?
-  constructingUpdateVideo   String?
-  constructingUpdatePrview  String?
-  location                  Json?
-  installmentPlan           Json?
-} 
+  name                     String   @unique
+  details                  String
+  image                    String?
+  mainVideo                String?
+  gallery                  String[]
+  features                 String[]
+  brochure                 String?
+  constructingUpdateVideo  String?
+  constructingUpdatePrview String?
+  location                 Json?
+  installmentPlan          Json?
+}
 model PropertyType {
-    id             Int      @default(autoincrement()) @id
-    createdAt      DateTime @default(now())
-    updatedAt      DateTime @updatedAt
-    name           String   @unique
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  name      String   @unique
-    projects       Project[]
+  projects Project[]
 }
 model RoomWithPrice {
-    id             Int      @default(autoincrement()) @id
-    createdAt      DateTime @default(now())
-    updatedAt      DateTime @updatedAt
-    room           String?
-    value          Int      @default(autoincrement())
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  room      String?
+  value     Int      @default(autoincrement())
-    price          String
-    priceQatar     String
-    priceTurkey    String
-    priceKSA       String
-    priceKuwait    String
-    priceUAE       String
-    priceOman      String
+  price       String
+  priceQatar  String
+  priceTurkey String
+  priceKSA    String
+  priceKuwait String
+  priceUAE    String
+  priceOman   String
+  Project     Project? @relation(fields: [projectId], references: [id])
+  projectId   Int?
 }
 model Country {
-  id                    Int      @default(autoincrement()) @id
-  createdAt             DateTime @default(now())
-  updatedAt             DateTime @updatedAt
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
-  name                  String   @unique
-  nameEN                String?
-  image                 String
-  gallery               Json?
-  isTurkey              Boolean @default(false)
-  rooms                 String[]
-  carouselImages        String[]
+  name           String   @unique
+  nameEN         String?
+  image          String
+  gallery        Json?
+  isTurkey       Boolean  @default(false)
+  isQatari       Boolean  @default(false)
+  rooms          String[]
+  carouselImages String[]
-  cities                City[]
-  projects              Project[]
-  explores              Explore[]
-  offers                Offer[]
-  oprationCompanyPages  OprationCompanyPage[]
-  contacts              Contact[]
+  cities               City[]
+  projects             Project[]
+  explores             Explore[]
+  offers               Offer[]
+  oprationCompanyPages OprationCompanyPage[]
+  contacts             Contact[]
 }
 model City {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  name      String   @unique
+  name      String  @unique
   latituade String?
   longitude String?
-  country   Country  @relation(fields: [countryId], references: [id])
-  countryId Int      
+  country   Country   @relation(fields: [countryId], references: [id])
+  countryId Int
+  Project   Project[]
 }
 model Contact {
-  id             Int      @default(autoincrement()) @id
-  createdAt      DateTime @default(now())
-  updatedAt      DateTime @updatedAt
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   name           String   @unique
   location       String
   phones         String[]
   mobiles        String[]
   locationObject Json
-  country        Country  @relation(fields: [countryId], references: [id])
-  countryId      Int
+  country   Country @relation(fields: [countryId], references: [id])
+  countryId Int
 }
 model Furnish {
-  id                Int      @default(autoincrement()) @id
-  createdAt         DateTime @default(now())
-  updatedAt         DateTime @updatedAt
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
-  name              String
-  description       String
-  image             String
-  price             String
+  name        String
+  description String
+  image       String
+  price       String
-  furnishCategory   FurnishCategory  @relation(fields: [furnishCategoryId], references: [id])
-  furnishCategoryId Int     
+  furnishCategory   FurnishCategory @relation(fields: [furnishCategoryId], references: [id])
+  furnishCategoryId Int
 }
 model FurnishCategory {
-  id          Int      @default(autoincrement()) @id
-  createdAt   DateTime @default(now())
-  updatedAt   DateTime @updatedAt
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
-  name        String @unique
-  image       String
-  furnishes   Furnish[]
+  name      String    @unique
+  image     String
+  furnishes Furnish[]
 }
 model Feature {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  name      String
-  image     String
+  name  String
+  image String
 }
 model Partner {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  name      String
-  image     String
+  name  String
+  image String
 }
 model Carousel {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  position  Int      @unique @default(autoincrement())
-  title     String?
-  text      String?
-  url       String?
-  image     String
+  position Int     @unique @default(autoincrement())
+  title    String?
+  text     String?
+  url      String?
+  image    String
 }
 model Explore {
-  id          Int           @default(autoincrement()) @id
-  createdAt   DateTime      @default(now())
-  updatedAt   DateTime      @updatedAt
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   title       String        @unique
   type        EXPLOAR_TYPES @default(dontMissitGallery)
   description String
   image       String
   videoUrl    String?
-  country     Country?       @relation(fields: [countryId], references: [id])
+  country     Country?      @relation(fields: [countryId], references: [id])
   countryId   Int?
 }
 model Request {
-  id        Int      @default(autoincrement()) @id
+  id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
-  type      REQUEST_TYPES @default(flights)
-  isNew     Boolean  @default(true)
-  data      Json
+  type  REQUEST_TYPES @default(flights)
+  isNew Boolean       @default(true)
+  data  Json
 }
-
 // --------------------------------------
-
 enum REQUEST_TYPES {
   flights
   hotels
   cars
@@ -299,5 +302,5 @@
 enum PAYMENT_TYPES {
   cash
   installment
-}
+}
```

