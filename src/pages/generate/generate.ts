import { PrismaClient } from '@prisma/client';
import { getInviteHash } from '../../utils/db';
import { generateHash } from '../../utils/utils';
const prisma = new PrismaClient();
export async function get() {
  // const hash = crypto.getRandomValues(randomBytes(20)).toString('hex');
  // while (true) {
  const hash = generateHash();
  // if (!(await getInviteHash(hash))) {
  const result = await prisma.hash.create({
    data: {
      hash,
    },
  });
  return new Response(JSON.stringify({ link: result.hash }), {
    status: 200,
  });
  // }
  // }
}
