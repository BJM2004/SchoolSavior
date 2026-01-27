/*
  Warnings:

  - You are about to drop the `ass_semestre_etudiant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ass_semestre_etudiant" DROP CONSTRAINT "ass_semestre_etudiant_etudiantId_fkey";

-- DropForeignKey
ALTER TABLE "ass_semestre_etudiant" DROP CONSTRAINT "ass_semestre_etudiant_semestreId_fkey";

-- DropTable
DROP TABLE "ass_semestre_etudiant";
