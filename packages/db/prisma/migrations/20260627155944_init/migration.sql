-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('GUIDE', 'NEWS', 'TIP', 'COMPARISON');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "GuideDifficulty" AS ENUM ('EASY', 'MEDIUM', 'ADVANCED');

-- CreateEnum
CREATE TYPE "FaqCategory" AS ENUM ('OPERATORS', 'SETUP', 'PACKAGES', 'GENERAL');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverAlt" TEXT,
    "category" "PostCategory" NOT NULL,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "difficulty" "GuideDifficulty",
    "estimatedTime" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" "FaqCategory" NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homepage" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "heroHeadline" TEXT NOT NULL,
    "heroSubheadline" TEXT NOT NULL,
    "heroCtaText" TEXT NOT NULL,
    "heroImage" TEXT,
    "whyEsimTitle" TEXT NOT NULL,
    "whyEsimItems" JSONB NOT NULL,
    "howItWorksTitle" TEXT NOT NULL,
    "howItWorksSteps" JSONB NOT NULL,
    "stats" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homepage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageCache" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_country_status_idx" ON "Post"("country", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Post_country_slug_key" ON "Post"("country", "slug");

-- CreateIndex
CREATE INDEX "Guide_country_status_idx" ON "Guide"("country", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_country_slug_key" ON "Guide"("country", "slug");

-- CreateIndex
CREATE INDEX "Faq_country_category_idx" ON "Faq"("country", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Homepage_country_key" ON "Homepage"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "PackageCache_country_expiresAt_idx" ON "PackageCache"("country", "expiresAt");
