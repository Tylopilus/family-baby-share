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
  let inputRef: HTMLInputElement | undefined = undefined;
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log('send');
    setSubmitted(true);
    setChildName('Alice Wonderland');
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
            <span class="font-bold mt-2">
              https://sharewfam.com/inv/123asdyj12z234
            </span>
          </div>
          <div class="flex justify-between mt-4">
            <Button variant="primary">
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
