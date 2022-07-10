import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.children.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      age: 0,
      name: 'Alice',
    },
  });

  const hash = await prisma.hash.upsert({
    where: {
      hash: 'pseudorandom',
    },
    update: {},
    create: {
      hash: 'pseudorandom',
      AccessHashTable: { create: [{ childrenId: 3 }] },
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
