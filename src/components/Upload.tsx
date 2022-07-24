import { createSignal, Show } from 'solid-js';
import Button from './Shared/Button';
import { UploadIndicator } from './Shared/Icons';

const Upload = () => {
  const [selectedItems, setSelectedItems] = createSignal(0);
  const [submitting, setSubmitting] = createSignal(false);

  async function uploadFiles(signData: any, files: FileList) {
    const url =
      'https://api.cloudinary.com/v1_1/' + signData.cloudname + '/auto/upload';
    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file);
      formData.append('api_key', signData.apikey);
      formData.append('timestamp', signData.timestamp);
      formData.append('signature', signData.signature);
      formData.append('folder', signData.folder);
      await fetch(url, {
        method: 'POST',
        body: formData,
      });
    }
  }
  const submitHandler = async (e: Event) => {
    const files = (document.querySelector('[type=file]') as HTMLInputElement)!
      .files!;
    const signData = await (await fetch('/api/cloudinary')).json();

    setSubmitting(true);

    // Append parameters to the form data. The parameters that are signed using
    // the signing function (signuploadform) need to match these.
    await uploadFiles(signData, files);
    window.location.href = '/';
    // console.log('submit');
  };
  return (
    <div
      class="absolute top-[50%] left-0 flex justify-center items-center flex-col w-full"
      style={{ transform: 'translateY(-50%)' }}>
      <Show
        when={!submitting()}
        fallback={
          <div class="w-24 h-24">
            <UploadIndicator />
          </div>
        }>
        <Input selectedItems={selectedItems} />
        <input
          type="file"
          name="file"
          multiple
          id="file"
          hidden
          onChange={(e) => {
            setSelectedItems((e.target as HTMLInputElement).files?.length || 0);
          }}
        />
      </Show>
      {selectedItems() > 0 && (
        <div class="mt-4 flex flex-col items-center">
          <Show when={!submitting()} fallback="Uploading images...">
            <div>{selectedItems() > 1 ? 'Files' : 'File'} selected</div>
          </Show>
          <Button variant="primary" class="mt-4" onClick={submitHandler}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default Upload;
const Input = (props: any) => {
  return (
    <label
      for="file"
      class="border rounded-full border-dashed border-black text-6xl w-24 h-24 flex items-center justify-center">
      <Show
        when={props.selectedItems() > 0}
        fallback={
          <svg class="w-24 h-24" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        }>
        {props.selectedItems()}
      </Show>
    </label>
  );
};
