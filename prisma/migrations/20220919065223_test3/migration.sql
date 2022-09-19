/*
  Warnings:

  - A unique constraint covering the columns `[userId,jwtid]` on the table `Logins` will be added. If there are existing duplicate values, this will fail.
  - Made the column `jwtid` on table `Logins` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Logins_userId_key";

-- AlterTable
ALTER TABLE "Logins" ALTER COLUMN "jwtid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Logins_userId_jwtid_key" ON "Logins"("userId", "jwtid");
