-- CreateEnum
CREATE TYPE "public"."MotoStatus" AS ENUM ('Disponivel', 'Manutencao', 'EmUso');

-- CreateEnum
CREATE TYPE "public"."MotoboyStatus" AS ENUM ('Disponivel', 'EmServico', 'Indisponivel');

-- CreateEnum
CREATE TYPE "public"."RotaStatus" AS ENUM ('Planejada', 'ACaminho', 'Concluida');

-- CreateEnum
CREATE TYPE "public"."PontoStatus" AS ENUM ('Pendente', 'Concluida', 'Falha');

-- CreateTable
CREATE TABLE "public"."Moto" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "capacidadeCargaQuilos" DOUBLE PRECISION NOT NULL,
    "status" "public"."MotoStatus" NOT NULL,

    CONSTRAINT "Moto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Motoboy" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "public"."MotoboyStatus" NOT NULL,

    CONSTRAINT "Motoboy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MotoMotoboy" (
    "id" SERIAL NOT NULL,
    "motoId" INTEGER NOT NULL,
    "motoboyId" INTEGER NOT NULL,
    "emUso" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MotoMotoboy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RotaEntrega" (
    "id" SERIAL NOT NULL,
    "motoboyId" INTEGER NOT NULL,
    "motoId" INTEGER NOT NULL,
    "dataHoraCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataHoraSaida" TIMESTAMP(3),
    "dataHoraChegada" TIMESTAMP(3),
    "status" "public"."RotaStatus" NOT NULL,

    CONSTRAINT "RotaEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PontoEntrega" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "rotaEntregaId" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "dataHoraCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataHoraSaida" TIMESTAMP(3),
    "dataHoraChegada" TIMESTAMP(3),
    "status" "public"."PontoStatus" NOT NULL,

    CONSTRAINT "PontoEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moto_placa_key" ON "public"."Moto"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Motoboy_cpf_key" ON "public"."Motoboy"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Motoboy_cnh_key" ON "public"."Motoboy"("cnh");

-- AddForeignKey
ALTER TABLE "public"."MotoMotoboy" ADD CONSTRAINT "MotoMotoboy_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "public"."Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MotoMotoboy" ADD CONSTRAINT "MotoMotoboy_motoboyId_fkey" FOREIGN KEY ("motoboyId") REFERENCES "public"."Motoboy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RotaEntrega" ADD CONSTRAINT "RotaEntrega_motoboyId_fkey" FOREIGN KEY ("motoboyId") REFERENCES "public"."Motoboy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RotaEntrega" ADD CONSTRAINT "RotaEntrega_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "public"."Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PontoEntrega" ADD CONSTRAINT "PontoEntrega_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PontoEntrega" ADD CONSTRAINT "PontoEntrega_rotaEntregaId_fkey" FOREIGN KEY ("rotaEntregaId") REFERENCES "public"."RotaEntrega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
