-- AlterTable
ALTER TABLE "matiere" ADD COLUMN     "professeurId" INTEGER;

-- CreateTable
CREATE TABLE "professeur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "tel" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "professeur_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "professeur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
