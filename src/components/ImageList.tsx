import { createEffect, createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';
import { getImage, Resources } from '../utils/cloudinary';

type Props = {
  images: Resources[];
};
const ImageList = (props: Props) => {
  const [image, setImage] = createSignal<any>();
  createEffect(() => {
    console.log(image);
  });
  return (
    <>
      {props.images.map((image) => (
        <Image image={image} setImage={setImage} />
      ))}
    </>
  );
};
export default ImageList;
const Image = (props: { image: Resources; setImage: (arg: any) => any }) => {
  const modifiers = 'w_1000,h_1000,c_limit';
  const splitUrl = props.image.secure_url.split('/image/upload/');
  const modifierUrl =
    splitUrl[0] + '/image/upload/' + modifiers + '/' + splitUrl[1];
  const url = modifierUrl.replaceAll(/jpg|png|jpeg/gi, 'webp');

  return (
    // <div ref={ref} class="image-wrapper">
    //   <img src={props.image.secure_url} alt={props.image.public_id} />
    // </div>
    <img src={url} alt={props.image.public_id} />
  );
};
