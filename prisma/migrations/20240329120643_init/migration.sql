-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "diameter" TEXT NOT NULL,
    "rotation_period" TEXT NOT NULL,
    "orbital_period" TEXT NOT NULL,
    "gravity" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,
    "surface_water" TEXT NOT NULL,
    "residents" TEXT[],
    "films" TEXT[],
    "url" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "edited" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);
