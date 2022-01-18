-- DropIndex
DROP INDEX "User.email_unique";

-- CreateTable
CREATE TABLE "Siswa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "no_tlp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kewarganegaraan" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "nama_ayah" TEXT NOT NULL,
    "pekerjaan_ayah" TEXT NOT NULL,
    "nama_ibu" TEXT NOT NULL,
    "pekerjaan_ibu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Siswa.email_unique" ON "Siswa"("email");
