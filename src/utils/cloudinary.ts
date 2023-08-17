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

export const signuploadform = (folder: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder,
    },
    cloudinary.config().api_secret!
  );

  return { timestamp, signature };
};
export type Image = {
  width: number;
  height: number;
  size: number;
  format: string;
  public_id: string;
};
export type Resources = {
  secure_url: string;
  created_at: string;
} & Image;

export async function getMedia(
  folder: string,
  maxResults = 100,
  nextCursor: string | null = null
): Promise<{ resources: Resources[]; nextCursor: string }> {
  let search = cloudinary.search
    .expression(`resource_type:image AND folder:${folder}`)
    .max_results(maxResults)
    .sort_by('created_at', 'desc');

  if (nextCursor) {
    search = search.next_cursor(nextCursor);
  }

  const res = await search.execute();
  return {
    resources: res.resources,
    nextCursor: res.next_cursor,
  };
}

export function getImage(img: Resources) {
  return cloudinary.picture(img.public_id, {
    crop: 'thumb',
    width: 400,
    height: 400,
    format: 'webp',
    gravity: 'face',
  });
}
