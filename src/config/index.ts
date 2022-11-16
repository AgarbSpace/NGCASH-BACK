import { PrismaClient } from '@prisma/client';

export function connectDb(): any {
  return new PrismaClient();
}

export const prisma: PrismaClient = connectDb();

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
