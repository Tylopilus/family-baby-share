import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function get({ params }) {
  const { id } = params;
  const hash = crypto.getRandomValues(randomBytes(20)).toString('hex');
  const res = await prisma.hash.create({
    data: {
      hash,
      AccessHashTable: { create: [{ childrenId: 1 }] }, // TODO: get childrenId from current user
    },
  });

  return new Response(JSON.stringify({ link: hash }), {
    status: 200,
  });
}
