-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "productSlug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "deliveryCharge" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_productSlug_idx" ON "Order"("productSlug");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
