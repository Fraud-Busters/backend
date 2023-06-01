-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PIPE', 'FITTING', 'VALVES');

-- CreateEnum
CREATE TYPE "Incoterms" AS ENUM ('FCA', 'CIF', 'DEP');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ISSUE_REQUEST_SENT', 'MATERIAL_REQUEST_SENT', 'PURCHASE_REQUEST_SENT', 'CHECKOUT', 'CREATING_PURCHASE_ORDER', 'PURCHASE_ORDER_SENT', 'DELIVERY', 'DELIVERED', 'ISSUE_GOOD_SENT', 'CANCELLED', 'SELECTED_FOR_CHECKOUT', 'BOOK_REQUEST', 'DECLINED', 'BOOK_CANCELLED');

-- CreateTable
CREATE TABLE "knex_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "batch" INTEGER,
    "migration_time" TIMESTAMPTZ(6),

    CONSTRAINT "knex_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knex_migrations_lock" (
    "index" SERIAL NOT NULL,
    "is_locked" INTEGER,

    CONSTRAINT "knex_migrations_lock_pkey" PRIMARY KEY ("index")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshToken" (
    "userId" UUID NOT NULL,
    "refreshToken" VARCHAR(255) NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_unique" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "refreshtoken_refreshtoken_unique" ON "refreshToken"("refreshToken");

-- AddForeignKey
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshtoken_userid_foreign" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
