-- CreateTable
CREATE TABLE "Moto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "capacidadeCargaQuilos" REAL NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Motoboy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MotoMotoboy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motoId" INTEGER NOT NULL,
    "motoboyId" INTEGER NOT NULL,
    "emUso" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "MotoMotoboy_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "Moto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MotoMotoboy_motoboyId_fkey" FOREIGN KEY ("motoboyId") REFERENCES "Motoboy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RotaEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motoboyId" INTEGER NOT NULL,
    "motoId" INTEGER NOT NULL,
    "dataHoraCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataHoraSaida" DATETIME,
    "dataHoraChegada" DATETIME,
    "status" TEXT NOT NULL,
    CONSTRAINT "RotaEntrega_motoboyId_fkey" FOREIGN KEY ("motoboyId") REFERENCES "Motoboy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RotaEntrega_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "Moto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PontoEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "rotaEntregaId" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "dataHoraCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataHoraSaida" DATETIME,
    "dataHoraChegada" DATETIME,
    "status" TEXT NOT NULL,
    CONSTRAINT "PontoEntrega_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PontoEntrega_rotaEntregaId_fkey" FOREIGN KEY ("rotaEntregaId") REFERENCES "RotaEntrega" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Moto_placa_key" ON "Moto"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Motoboy_cpf_key" ON "Motoboy"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Motoboy_cnh_key" ON "Motoboy"("cnh");
