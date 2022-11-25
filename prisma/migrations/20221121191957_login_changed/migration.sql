/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Logins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Logins" DROP COLUMN "refreshToken";
