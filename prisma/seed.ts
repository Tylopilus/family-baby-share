import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.children.create({
    data: {
      age: 0,
      name: 'Alice',
      accessHashes: [],
    },
  });

  const hash = await prisma.hash.create({
    data: {
      hash: '123123',
      AccessHashTable: { create: [{ childrenId: 1 }] },
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
