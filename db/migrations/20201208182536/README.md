# Migration `20201208182536`

This migration has been generated by Mohammed at 12/8/2020, 9:25:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT E'inprogress'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201207193446..20201208182536
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
@@ -37,33 +37,34 @@
   privateData        String?
 }
 model Project {
-  id                        Int      @default(autoincrement()) @id
-  createdAt                 DateTime @default(now())
-  updatedAt                 DateTime @updatedAt
+  id                        Int             @default(autoincrement()) @id
+  createdAt                 DateTime        @default(now())
+  updatedAt                 DateTime        @updatedAt
+  paymentType               PAYMENT_TYPES   @default(cash)
+  status                    STATUS          @default(inprogress)
+  country                   Country          @relation(fields: [countryId], references: [id])
+  countryId                 Int
+  propertyType              PropertyType?    @relation(fields: [propertyTypeId], references: [id])
+  propertyTypeId            Int?
+
   name                      String
   subTitle                  String
   details                   String
-  status                    STATUS
   image                     String?
   gallery                   String[]
   floorplan                 String[]
   features                  String[]
   brochure                  String?
-  paymentType               PAYMENT_TYPES @default(cash)
   constructingUpdateVideo   String?
   constructingUpdatePrview  String?
   nearBy                    Json?
   roomsWithPrices           RoomWithPrice[]
   location                  Json?
   installmentPlan           Json?
   locationText              String?
-  country                   Country  @relation(fields: [countryId], references: [id])
-  countryId                 Int
-  propertyType              PropertyType? @relation(fields: [propertyTypeId], references: [id])
-  propertyTypeId            Int?
 } 
 model PropertyType {
     id             Int      @default(autoincrement()) @id
```

