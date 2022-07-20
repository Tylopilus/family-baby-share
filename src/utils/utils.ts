import * as crypto from 'crypto';
export function generateHash() {
  return crypto.randomUUID();
}
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.match('image')) {
      return reject(new Error('INVALID_FILE'));
    }

    if (
      !file.type.match('jpeg') &&
      !file.type.match('jpg') &&
      !file.type.match('png')
    ) {
      return reject(new Error('INVALID_FILE'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string | null;
      if (base64data) {
        resolve(base64data);
      } else {
        reject(new Error('Unkown error'));
      }
    };
  });
}

export async function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.match('image')) {
      return reject(new Error('INVALID_FILE'));
    }

    if (
      !file.type.match('jpeg') &&
      !file.type.match('jpg') &&
      !file.type.match('png')
    ) {
      return reject(new Error('INVALID_FILE'));
    }
    resolve(file);
  });
}

type Obj = {
  date: string;
  name: string;
};
// turn obj into map grouped by key 'date'
export const groupBy = (obj: Obj[], key: string) => {
  return obj.reduce((acc, curr) => {
    if (!acc.has(curr.date)) {
      acc.set(curr.date, []);
    }
    acc.get(curr.date)?.push(curr.name);
    return acc;
  }, new Map<string, string[]>());
};
