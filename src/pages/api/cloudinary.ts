import { v2 as cloudinary } from 'cloudinary';
import { signuploadform } from '../../utils/cloudinary';
import { checkLogin, getUser } from '../../utils/db';
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;
export async function get({ request }: { request: Request }) {
  // console.log(request.headers.get('cookie'));
  // TODO: Need to read the user's children hash to add to folder during signature creation

  const isLoggedIn = await checkLogin(request.headers.get('cookie'));
  if (!isLoggedIn.token || isLoggedIn.access !== 'account') {
    return new Response('Unauthorized', { status: 401 });
  }
  const user = await getUser(isLoggedIn.token);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const folder = `${import.meta.env.CLOUDINARY_FOLDER}/${user.id}`;
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
