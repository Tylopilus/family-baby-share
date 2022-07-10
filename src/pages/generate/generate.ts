import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as fs from 'fs';
// import cr from 'crypto';
export async function get({ params }) {
  const { id } = params;
  const hash = crypto.getRandomValues(randomBytes(20)).toString('hex');
  const res = await prisma.hash.create({
    data: {
      hash,
    },
  });
  console.log(res);
  return new Response(JSON.stringify({ link: hash }), {
    status: 200,
  });
}
