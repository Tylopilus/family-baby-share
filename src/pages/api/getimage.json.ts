import { Resources, getMedia } from '../../utils/cloudinary';
import { checkLogin, getChildren } from '../../utils/db';

async function fetchImages(
  child: string,
  nextCursor: string | null
): Promise<{ resources: Resources[]; cursor: string }> {
  const { resources, nextCursor: cursor } = await getMedia(
    `${import.meta.env.CLOUDINARY_FOLDER}/${child}`,
    10,
    nextCursor
  );

  return {
    resources,
    cursor,
  };
}
export async function get({ request }: { request: Request }) {
  const authorizable = await checkLogin(request.headers.get('cookie'));
  console.timeEnd('checkLogin');
  console.time('getChildren');
  const children = await getChildren(authorizable);
  console.timeEnd('getChildren');

  if (!authorizable.loggedIn || !children.length) {
    return {
      status: 401,
    };
  }
  let nextCursor: string | null = new URLSearchParams(
    request.url.split('?')[1] ?? ''
  ).get('cursor');
  if (nextCursor === 'undefined') nextCursor = null;

  const { resources, cursor } = await fetchImages(children[0], nextCursor);
  return {
    status: 200,
    body: JSON.stringify({
      images: resources,
      cursor,
    }),
  };
}
