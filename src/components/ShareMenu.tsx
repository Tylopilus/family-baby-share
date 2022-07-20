import { createSignal } from 'solid-js';
import Share from './Share';
import Button from './Shared/Button';
import { ShareIcon } from './Shared/Icons';
import Modal from './Shared/Modal';

const ShareMenu = () => {
  const [show, setShow] = createSignal(false);

  return (
    <Button
      variant="primary"
      onClick={() => setShow(true)}
      class="flex items-center gap-1">
      Share
      <ShareIcon />
      <Modal show={show} onClose={() => setShow(false)}>
        <div class="flex flex-col items-center justify-center text-center w-full px-8">
          <Share />
        </div>
      </Modal>
    </Button>
  );
};

export default ShareMenu;
