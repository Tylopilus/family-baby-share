import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.children.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      age: 0,
      firstName: 'Alice',
      lastName: 'Wonderland',
      user_uid: 'e284c145-43b3-48b8-9bcf-e7e5f8284d3a',
    },
  });

  const hash = await prisma.hash.upsert({
    where: {
      hash: 'pseudorandom',
    },
    update: {},
    create: {
      hash: 'pseudorandom',
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
