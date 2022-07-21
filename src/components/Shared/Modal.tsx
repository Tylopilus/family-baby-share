import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import Button from './Button';
import { CloseIcon } from './Icons';

const Modal = (Props: any) => {
  return (
    <>
      <Show when={Props.show()}>
        <Portal mount={document.body}>
          <div class="z-50 absolute top-0 left-0 h-screen w-full modal">
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
        </Portal>
      </Show>
    </>
  );
};
export default Modal;
