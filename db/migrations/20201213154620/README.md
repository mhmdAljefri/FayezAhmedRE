# Migration `20201213154620`

This migration has been generated by Mohammed at 12/13/2020, 6:46:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Offer" ADD COLUMN     "mainVideo" TEXT

CREATE UNIQUE INDEX "Offer.name_unique" ON "Offer"("name")

CREATE UNIQUE INDEX "PropertyType.name_unique" ON "PropertyType"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201212195412..20201213154620
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
@@ -96,11 +96,12 @@
   countryId                 Int
   project                   Project?        @relation(fields: [projectId], references: [id])
   projectId                 Int?
-  name                      String
+  name                      String          @unique
   details                   String
   image                     String?
+  mainVideo                 String?
   gallery                   String[]
   features                  String[]
   brochure                  String?
   constructingUpdateVideo   String?
```

