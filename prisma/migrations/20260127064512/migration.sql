-- CreateEnum
CREATE TYPE "StatutDette" AS ENUM ('PAYEE', 'NON_PAYEE', 'PARTIELLE');

-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REFUSE');

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "annee" TEXT NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departement" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "departement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axe" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "departementId" INTEGER NOT NULL,

    CONSTRAINT "axe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etudiant" (
    "id" SERIAL NOT NULL,
    "matricule" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "tel" TEXT,
    "password" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "axeId" INTEGER NOT NULL,
    "departementId" INTEGER NOT NULL,
    "promotionId" INTEGER NOT NULL,

    CONSTRAINT "etudiant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "tel" TEXT,
    "adresse" TEXT,
    "profession" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ass_etudiant_parent" (
    "etudiantId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "ass_etudiant_parent_pkey" PRIMARY KEY ("etudiantId","parentId")
);

-- CreateTable
CREATE TABLE "semestre" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "annee" TEXT NOT NULL,
    "departementId" INTEGER NOT NULL,

    CONSTRAINT "semestre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matiere" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "semestreId" INTEGER NOT NULL,

    CONSTRAINT "matiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ass_matiere_etudiant" (
    "matiereId" INTEGER NOT NULL,
    "etudiantId" INTEGER NOT NULL,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "note_cc" DOUBLE PRECISION,
    "note_sn" DOUBLE PRECISION,

    CONSTRAINT "ass_matiere_etudiant_pkey" PRIMARY KEY ("matiereId","etudiantId")
);

-- CreateTable
CREATE TABLE "ass_semestre_etudiant" (
    "semestreId" INTEGER NOT NULL,
    "etudiantId" INTEGER NOT NULL,

    CONSTRAINT "ass_semestre_etudiant_pkey" PRIMARY KEY ("semestreId","etudiantId")
);

-- CreateTable
CREATE TABLE "dette" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" "StatutDette" NOT NULL DEFAULT 'NON_PAYEE',
    "etudiantId" INTEGER NOT NULL,

    CONSTRAINT "dette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paiement" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" "StatutPaiement" NOT NULL DEFAULT 'EN_ATTENTE',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "etudiant_matricule_key" ON "etudiant"("matricule");

-- AddForeignKey
ALTER TABLE "axe" ADD CONSTRAINT "axe_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_axeId_fkey" FOREIGN KEY ("axeId") REFERENCES "axe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_etudiant_parent" ADD CONSTRAINT "ass_etudiant_parent_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_etudiant_parent" ADD CONSTRAINT "ass_etudiant_parent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semestre" ADD CONSTRAINT "semestre_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_matiere_etudiant" ADD CONSTRAINT "ass_matiere_etudiant_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "matiere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_matiere_etudiant" ADD CONSTRAINT "ass_matiere_etudiant_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_semestre_etudiant" ADD CONSTRAINT "ass_semestre_etudiant_semestreId_fkey" FOREIGN KEY ("semestreId") REFERENCES "semestre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ass_semestre_etudiant" ADD CONSTRAINT "ass_semestre_etudiant_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dette" ADD CONSTRAINT "dette_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "etudiant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
