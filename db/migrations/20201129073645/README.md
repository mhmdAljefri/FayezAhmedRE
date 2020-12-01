# Migration `20201129073645`

This migration has been generated by Mohammed at 11/29/2020, 10:36:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Carousel" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"position" integer   NOT NULL ,
"title" text   NOT NULL ,
"text" text   NOT NULL ,
"url" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Carousel.position_unique" ON "public"."Carousel"("position")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201128204438..20201129073645
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
@@ -148,4 +148,15 @@
   name      String
   image     String
 }
+
+model Carousel {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  position  Int @unique
+  title     String
+  text      String
+  url       String
+}
```

