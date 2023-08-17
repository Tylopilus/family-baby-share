import { For, createEffect, createSignal } from 'solid-js';
import { Resources } from '../utils/cloudinary';

type Props = {
  images: Resources[];
  cursor: string | null;
};
let imageList: HTMLDivElement;
const ImageList = (props: Props) => {
  const [images, setImaages] = createSignal<Resources[]>(props.images);
  const [cursor, setCursor] = createSignal<string | null>(props.cursor);
  let fetching = false;
  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8 &&
      !fetching
    ) {
      fetching = true;
      await fetchNextData();
      fetching = false;
    }
  };

  createEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  const fetchNextData = async () => {
    if (!cursor()) return;
    const res = await (
      await fetch('/api/getimage.json?cursor=' + cursor())
    ).json();
    setImaages([...images(), ...res.images]);
    setCursor(res.cursor);
  };
  return (
    <div ref={imageList}>
      <For each={images()}>{(image) => <Image image={image} />}</For>
    </div>
  );
};
export default ImageList;
const Image = (props: { image: Resources; ref?: HTMLImageElement | any }) => {
  const modifiers = 'w_1000,h_1000,c_limit';
  const splitUrl = props.image.secure_url.split('/image/upload/');
  const modifierUrl =
    splitUrl[0] + '/image/upload/' + modifiers + '/' + splitUrl[1];
  const url = modifierUrl.replaceAll(/jpg|png|jpeg/gi, 'webp');

  return (
    <img
      ref={props.ref}
      src={url}
      alt={props.image.public_id}
      width={props.image.width}
      height={props.image.height}
    />
  );
};
