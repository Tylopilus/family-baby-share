import { v2 as cloudinary } from 'cloudinary';
import { signuploadform } from '../../utils/cloudinary';
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;
export async function get({ request }: { request: Request }) {
  // console.log(request.headers.get('cookie'));
  // TODO: Need to read the user's children hash to add to folder during signature creation
  const sig = signuploadform();
  return new Response(
    JSON.stringify({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey,
      folder: import.meta.env.DEV ? 'dev' : 'prod',
    }),
    {
      status: 200,
    }
  );
}
