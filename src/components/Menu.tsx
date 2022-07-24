import { createSignal } from 'solid-js';
import Button from './Shared/Button';
import { MenuIcon } from './Shared/Icons';
import Modal from './Shared/Modal';

const Menu = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <Button styled={false} onClick={() => setIsOpen(true)}>
      <MenuIcon />
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <ul class="flex flex-col gap-12 font-bold text-4xl text-center">
          <li>
            <a href="/upload">Upload Photos</a>
          </li>
          <li>
            <a href="/manage">Manage Access</a>
          </li>
          {/* <li>
            <a href="/add">Add child</a>
          </li> */}
        </ul>
      </Modal>
    </Button>
  );
};

export default Menu;
