-- DropForeignKey
ALTER TABLE "Logins" DROP CONSTRAINT "Logins_userId_fkey";

-- AddForeignKey
ALTER TABLE "Logins" ADD CONSTRAINT "Logins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
