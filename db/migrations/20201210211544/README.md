# Migration `20201210211544`

This migration has been generated by Mohammed at 12/11/2020, 12:15:44 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "OprationCompanyPageData" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "constructingUpdateVideo" TEXT,
    "constructingUpdatePrview" TEXT,
    "oprationCompanies" JSONB,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201210210936..20201210211544
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
@@ -63,19 +63,33 @@
   location                  Json?
   installmentPlan           Json?
   locationText              String?
   oprationCompanies         Json?
-} 
+}
+model OprationCompanyPageData {
+  id                        Int             @default(autoincrement()) @id
+  createdAt                 DateTime        @default(now())
+  updatedAt                 DateTime        @updatedAt
+
+  title                     String
+  description               String
+  image                     String?
+  video                     String?
+  constructingUpdateVideo   String?
+  constructingUpdatePrview  String?
+  oprationCompanies         Json?
+}
+
 model Offer {
   id                        Int             @default(autoincrement()) @id
   createdAt                 DateTime        @default(now())
   updatedAt                 DateTime        @updatedAt
   paymentType               PAYMENT_TYPES   @default(cash)
   status                    STATUS          @default(inprogress)
   country                   Country         @relation(fields: [countryId], references: [id])
   countryId                 Int
-  project                   Project?   @relation(fields: [projectId], references: [id])
+  project                   Project?        @relation(fields: [projectId], references: [id])
   projectId                 Int?
   name                      String
   details                   String
```

