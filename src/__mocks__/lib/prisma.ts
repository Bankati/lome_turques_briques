// Mock du client Prisma pour les tests unitaires.
// Évite toute tentative de connexion à la base de données.
//
// Utilisation dans un test :
//   jest.mock('@/lib/prisma');
//   import { prisma } from '@/lib/prisma';
//   (prisma.testimonial.findMany as jest.Mock).mockResolvedValue([...]);

import { PrismaClient } from "@prisma/client";

type PrismaModel = {
  findMany: jest.Mock;
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  count: jest.Mock;
  upsert: jest.Mock;
};

function createModelMock(): PrismaModel {
  return {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    upsert: jest.fn(),
  };
}

export const prisma = {
  testimonial: createModelMock(),
  contactMessage: createModelMock(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn(),
} as unknown as PrismaClient;
