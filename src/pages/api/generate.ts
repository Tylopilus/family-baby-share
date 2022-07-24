import { checkLogin, getInviteHash, prismaClient } from '../../utils/db';
import { generateHash } from '../../utils/utils';
// export async function get() {
//   // const hash = crypto.getRandomValues(randomBytes(20)).toString('hex');
// }

export async function post({ request }: { request: Request }) {
  const cookies = request.headers.get('cookie');
  const isLoggedIn = await checkLogin(cookies);
  if (isLoggedIn.access !== 'account') {
    return new Response('Unauthorized', { status: 401 });
  }
  const hash = generateHash();
  if (!(await getInviteHash(hash))) {
    const result = await prismaClient.inviteHash.create({
      data: {
        hash,
        recipient: (await request.json()).recipient,
      },
    });
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  }
}
