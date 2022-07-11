import * as crypto from 'crypto';
export function generateHash() {
  const hash = crypto.randomBytes(20).toString('hex');
  return hash;
}
