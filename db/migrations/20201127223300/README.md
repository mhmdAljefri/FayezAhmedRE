# Migration `20201127223300`

This migration has been generated by Mohammed at 11/28/2020, 1:33:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."RoomWithPrice" ADD COLUMN "createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)   NOT NULL 

CREATE TABLE "public"."Furnish" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   NOT NULL ,
"description" text   NOT NULL ,
"image" text   NOT NULL ,
"price" text   NOT NULL ,
"furnishCategoryId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."FurnishCategory" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   NOT NULL ,
"image" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "FurnishCategory.name_unique" ON "public"."FurnishCategory"("name")

ALTER TABLE "public"."Furnish" ADD FOREIGN KEY ("furnishCategoryId")REFERENCES "public"."FurnishCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127220515..20201127223300
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
@@ -60,8 +60,10 @@
 }
 model RoomWithPrice {
     id             Int      @default(autoincrement()) @id
+    createdAt      DateTime @default(now())
+    updatedAt      DateTime @updatedAt
     room           String
     price          String
     priceQatar     String
@@ -84,8 +86,33 @@
   projects  Project[]
 }
+model Furnish {
+  id                Int      @default(autoincrement()) @id
+  createdAt         DateTime @default(now())
+  updatedAt         DateTime @updatedAt
+
+  name              String
+  description       String
+  image             String
+  price             String
+
+
+  furnishCategory   FurnishCategory  @relation(fields: [furnishCategoryId], references: [id])
+  furnishCategoryId Int     
+}
+
+model FurnishCategory {
+  id          Int      @default(autoincrement()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+
+  name        String @unique
+  image       String
+  furnish     Furnish[]
+}
+
 enum STATUS {
   completed
   inprogress
 }
```

