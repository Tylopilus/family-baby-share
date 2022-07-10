import { randomBytes } from 'crypto';
import * as fs from 'fs';
// import cr from 'crypto';
export async function get({ params }) {
  const { id } = params;
  const hash = crypto.getRandomValues(randomBytes(20)).toString('hex');

  return new Response(JSON.stringify({ link: hash }), {
    status: 200,
  });
}
