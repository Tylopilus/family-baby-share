import { v2 as cloudinary } from 'cloudinary';
import { signuploadform } from '../../utils/cloudinary';
import { getLoginToken, getUser } from '../../utils/db';
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;
export async function get({ request }: { request: Request }) {
  // console.log(request.headers.get('cookie'));
  // TODO: Need to read the user's children hash to add to folder during signature creation
  const loginToken = getLoginToken(request.headers.get('cookie'));
  const user = await getUser(loginToken);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const folder = `import.meta.env.CLOUDINARY_FOLDER/${user.id}`;
  const sig = signuploadform(folder);
  return new Response(
    JSON.stringify({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey,
      folder,
    }),
    {
      status: 200,
    }
  );
}
