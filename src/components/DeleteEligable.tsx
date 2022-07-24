import { createSignal, Show } from 'solid-js';
import Button from './Shared/Button';
import { UploadIndicator } from './Shared/Icons';

type Props = {
  recipient: string | null;
  hash: string;
};
const DeleteEligable = (props: Props) => {
  const [deleting, setDeleting] = createSignal(false);
  return (
    <Button
      client:load
      class="px-4 py-2 my-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
      styled={false}
      onClick={async () => {
        setDeleting(true);
        const result = await fetch(`/api/deleteRecipient/${props.hash}`);
        if (result.ok) {
          window.location.reload();
        }
      }}>
      <span class="flex items-center justify-center">
        <Show when={deleting()} fallback="Delete">
          <div class="w-6 h-6">
            <UploadIndicator color="#fff" />
          </div>
        </Show>
      </span>
    </Button>
  );
};

export default DeleteEligable;
