/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Logins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Logins_userId_key" ON "Logins"("userId");
