import {
  checkLogin,
  deleteRecipient,
  getChild,
  getChildren,
  prismaClient,
} from '../../../utils/db';
export async function get({
  request,
  params,
}: {
  request: Request;
  params: { hash: string };
}) {
  const cookies = request.headers.get('cookie');
  const isLoggedIn = await checkLogin(cookies);
  if (isLoggedIn.access !== 'account') {
    return new Response('Unauthorized', { status: 401 });
  }

  // console.log(request.url, params.hash);
  const children = await getChildren(isLoggedIn);
  const child = await getChild(children[0]);
  const result = await deleteRecipient(params.hash, child?.user_uid);
  return new Response('Recipient deleted', {
    status: 200,
  });
}
