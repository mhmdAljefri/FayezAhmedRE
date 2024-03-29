# Migration `20210422185553`

This migration has been generated by Mohammed Aljefri at 4/22/2021, 9:55:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Offer" ADD COLUMN     "purposeId" INTEGER

ALTER TABLE "Project" ADD COLUMN     "purposeId" INTEGER

ALTER TABLE "Offer" ADD FOREIGN KEY("purposeId")REFERENCES "Purpose"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("purposeId")REFERENCES "Purpose"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210421180011..20210422185553
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
@@ -50,8 +50,12 @@
   city                      City?           @relation(fields: [cityId], references: [id])
   cityId                    Int?
   propertyType              PropertyType?   @relation(fields: [propertyTypeId], references: [id])
   propertyTypeId            Int?
+
+  purpose                   Purpose?          @relation(fields: [purposeId], references: [id])
+  purposeId                 Int?
+
   isHousingComplex          Boolean         @default(false)
   isGrantedByGov            Boolean         @default(false)
   isWithSeaView             Boolean         @default(false)
   isDelux                   Boolean         @default(false)
@@ -109,8 +113,10 @@
   city                      City?           @relation(fields: [cityId], references: [id])
   cityId                    Int?
   project                   Project?        @relation(fields: [projectId], references: [id])
   projectId                 Int?
+  purpose                   Purpose?          @relation(fields: [purposeId], references: [id])
+  purposeId                 Int?
   name                      String          @unique
   subTitle                  String?
   details                   String
@@ -145,8 +151,11 @@
     id             Int      @default(autoincrement()) @id
     createdAt      DateTime @default(now())
     updatedAt      DateTime @updatedAt
     name           String   @unique
+
+    projects       Project[]
+    offers         Offer[]
 }
 model RoomWithPrice {
     id             Int      @default(autoincrement()) @id
```


