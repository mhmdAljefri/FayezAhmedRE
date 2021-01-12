# Migration `20210111141017`

This migration has been generated by Mohammed at 1/11/2021, 5:10:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Project" ADD COLUMN     "isDelux" BOOLEAN NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210105205131..20210111141017
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
@@ -51,8 +51,9 @@
   propertyTypeId            Int?
   isHousingComplex          Boolean         @default(false)
   isGrantedByGov            Boolean         @default(false)
   isWithSeaView             Boolean         @default(false)
+  isDelux                   Boolean         @default(false)
   housingComplexText        String?
   housingComplexImage       String?
   name                      String
   views                     Int             @default(0)
```

