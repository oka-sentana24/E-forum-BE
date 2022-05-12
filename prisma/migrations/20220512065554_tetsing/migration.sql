/*
  Warnings:

  - You are about to drop the column `userId` on the `Guru` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Siswa` table. All the data in the column will be lost.
  - You are about to drop the `Guru_kelas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_kelas` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kelas` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guru" DROP CONSTRAINT "Guru_userId_fkey";

-- DropForeignKey
ALTER TABLE "Siswa" DROP CONSTRAINT "Siswa_userId_fkey";

-- AlterTable
ALTER TABLE "Guru" DROP COLUMN "userId",
DROP COLUMN "id_kelas",
ADD COLUMN     "id_kelas" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "userId",
DROP COLUMN "id_kelas",
ADD COLUMN     "id_kelas" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Guru_kelas";

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guru" ADD CONSTRAINT "Guru_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Guru.email_unique" RENAME TO "Guru_email_key";

-- RenameIndex
ALTER INDEX "Siswa.email_unique" RENAME TO "Siswa_email_key";
