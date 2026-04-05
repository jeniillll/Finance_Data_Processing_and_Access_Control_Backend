-- DropForeignKey
ALTER TABLE "FinEntry" DROP CONSTRAINT "FinEntry_categoryId_fkey";

-- AlterTable
ALTER TABLE "FinEntry" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FinEntry" ADD CONSTRAINT "FinEntry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
