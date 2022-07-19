import { onCleanup, onMount, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { isServer } from 'solid-js/web';
import Button from './Button';
import { CloseIcon } from './Icons';

const Modal = (Props: any) => {
  return (
    <>
      <Show when={Props.show()}>
        <Inner>
          <div class="z-50 absolute top-0 left-0 h-screen w-screen modal">
            <div class="bg-modal" />
            <div class="text-white flex flex-col items-center justify-center h-screen">
              {Props.children}
              <Button
                onClick={Props.onClose}
                class="border-white rounded-full px-4 py-4 absolute bottom-[15%]">
                <CloseIcon />
              </Button>
            </div>
          </div>
        </Inner>
      </Show>
    </>
  );
};
export default Modal;

const Inner = (props: any) => {
  const ref = document.createElement('div');
  ref.id = 'modal';
  onMount(() => document.body.appendChild(ref));
  onCleanup(() => document.body.removeChild(ref));
  return <Portal mount={ref}>{props.children}</Portal>;
};
