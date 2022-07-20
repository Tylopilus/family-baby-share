import { createSignal, Show } from 'solid-js';
import Button from './Shared/Button';
import { ShareIcon } from './Shared/Icons';

type FormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};

const Share = () => {
  const [submitted, setSubmitted] = createSignal(false);
  const [childName, setChildName] = createSignal('');
  const [inviteLink, setInviteLink] = createSignal('');
  let inputRef: HTMLInputElement | undefined = undefined;
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setChildName('Alice Wonderland');

    const res = (await (
      await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient: inputRef!.value }),
      })
    ).json()) as {
      id: string;
      createdAt: string;
      hash: string;
      recipient: string;
    };
    setInviteLink(`http://localhost:3000/inv/${res.hash}`);
  };
  return (
    <>
      <Show when={!submitted()}>
        <form
          class="flex flex-col items-center justify-center w-full"
          onSubmit={(e) => submitHandler(e)}>
          <label for="recipient">Share with</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            class="w-full h-8 text-center text-black text-xl mt-2 max-w-xs"
            required
            placeholder="John Doe"
            ref={inputRef}
          />
          <Button variant="primary" class="mt-8">
            Generate Link
          </Button>
        </form>
      </Show>
      <Show when={submitted()}>
        <div class="max-w-sm">
          <span class="text-2xl">
            Link for <span class="block font-bold">{inputRef!.value}</span>
          </span>
          <span class="block text-4xl mt-3">🎉</span>
          <p class="block mt-6">
            Send this link to {inputRef!.value} to access the images of{' '}
            {childName()}
          </p>
          <div>
            <span class="font-bold mt-2">{inviteLink()}</span>
          </div>
          <div class="flex justify-between mt-4">
            <Button
              variant="primary"
              onClick={async () =>
                await navigator.clipboard.writeText(inviteLink())
              }>
              Copy link
              <span class="inline-block ml-2">
                <ShareIcon color="#ffffff" />
              </span>
            </Button>
            <Button variant="primary">
              Whatsapp
              <span class="inline-block ml-2">
                <ShareIcon color="#ffffff" />
              </span>
            </Button>
          </div>
        </div>
      </Show>
    </>
  );
};
export default Share;