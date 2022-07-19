import { createSignal } from 'solid-js';
import Button from './Shared/Button';
import { ShareIcon } from './Shared/Icons';
import Modal from './Shared/Modal';

const Share = () => {
  const [show, setShow] = createSignal(false);

  return (
    <Button
      variant="primary"
      onClick={() => setShow(true)}
      class="flex items-center gap-1">
      Share
      <ShareIcon />
      <Modal show={show} onClose={() => setShow(false)}>
        Share
      </Modal>
    </Button>
  );
};

export default Share;
