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

export async function getMedia(folder: string): Promise<any> {
  const images: Resources[] = [];

  const res = await cloudinary.search
    .expression(`resource_type:image AND folder:${folder}`)
    .max_results(500)
    .sort_by('created_at', 'desc')
    .execute();
  // console.log(res);
  return res.resources;
  async function getImages(page: number) {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 50,
      page,
    });
    images.push(...result.resources);
    // if (result.next_cursor) {
    //   await getImages(page + 1);
    // }
  }
  await getImages(1);

  images.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return images;
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
