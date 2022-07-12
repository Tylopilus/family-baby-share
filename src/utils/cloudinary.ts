import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiOptions } from 'cloudinary';
cloudinary.config({
  secure: true,
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(imagePath: any) {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: import.meta.env.CLOUDINARY_FOLDER,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);
    return result.public_id;
  } catch (error) {
    // console.error('error');
    throw error;
  }
}

export const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: import.meta.env.DEV ? 'dev' : 'prod',
    },
    cloudinary.config().api_secret!
  );

  return { timestamp, signature };
};
