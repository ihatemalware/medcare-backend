/*
  Warnings:

  - You are about to drop the column `note` on the `Medicine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "note",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "dosage" TEXT,
ADD COLUMN     "expiry_date" TIMESTAMP(3),
ADD COLUMN     "generic_name" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "notes" TEXT;
