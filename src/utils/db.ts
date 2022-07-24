import { PrismaClient } from '@prisma/client';
import type { Children, InviteHash } from '@prisma/client';
import { supabase } from './supabase';
const prisma = new PrismaClient();
export const prismaClient = prisma;

type ExtractTypeOfObj<Obj, Key extends keyof Obj> = Pick<Obj, Key>[Key];
export type ChildUUID = ExtractTypeOfObj<Children, 'user_uid'>;
export type TokenType = 'familyShareAccess' | 'access_token';

// export type ChildUUID = Pick<Children, 'user_uid'>

export type Authoziable = {
  loggedIn: boolean;
  access: 'account' | 'guest' | null;
  token: string | null;
};

export async function getHash(hash: string): Promise<string | null> {
  const result = await prisma.hash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return result.hash;
  }
  return null;
}

export async function getInviteHash(hash: string): Promise<InviteHash | null> {
  const result = await prisma.inviteHash.findFirst({
    where: {
      hash,
    },
  });

  if (result) {
    return result;
  }
  return null;
}

export async function createHash(
  hash: string,
  recipient: string
): Promise<string> {
  const result = await prisma.hash.create({
    data: {
      hash,
      AccessHashTable: { create: [{ childrenId: 1, recipient }] },
    },
  });
  return result.hash;
}

export async function deleteInviteHash(hash: string): Promise<void> {
  await prisma.inviteHash.delete({
    where: {
      hash,
    },
  });
}

export async function isLoggedIn(hash: string | undefined): Promise<boolean> {
  if (!hash) return false;
  const result = await prisma.hash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return true;
  }
  return false;
}

export function getLoginToken(
  cookies: string | null,
  tokenName: TokenType = 'access_token'
): string | undefined {
  if (!cookies) return undefined;
  const loginToken = cookies
    .split('; ')
    .find((item) => item.startsWith(`${tokenName}=`))
    ?.split('=')[1];
  return loginToken;
}

export async function checkLogin(cookies: string | null): Promise<Authoziable> {
  const unauthenticated = {
    loggedIn: false,
    access: null,
    token: null,
  };
  if (!cookies) return unauthenticated;
  const familyShareAccessToken = getLoginToken(cookies, 'familyShareAccess');
  const loginToken = getLoginToken(cookies, 'access_token');
  if (loginToken) {
    const { user } = await supabase.auth.api.getUser(loginToken);
    // TODO: generate new token so user's token is refreshed
    if (user) {
      return {
        loggedIn: true,
        access: 'account',
        token: loginToken,
      };
    }
  }
  if (familyShareAccessToken) {
    const result = await prisma.hash.findFirst({
      where: {
        hash: familyShareAccessToken,
      },
    });
    if (result) {
      return {
        loggedIn: true,
        access: 'guest',
        token: result.hash,
      };
    }
  }
  return unauthenticated;
}

export async function getUser(loginToken: string | undefined) {
  if (!loginToken) return null;
  const { user } = await supabase.auth.api.getUser(loginToken);
  return user;
}

export async function getUserFromCookie(
  cookies: string | null
): ReturnType<typeof getUser> {
  const loginToken = getLoginToken(cookies, 'access_token');
  return getUser(loginToken);
}

export async function getChildren(
  authorizable: Authoziable
): Promise<string[]> {
  const children: ChildUUID[] = [];
  if (authorizable.token && authorizable.access === 'guest') {
    const dbResult = await prisma.accessHashTable.findMany({
      where: {
        hash: authorizable.token,
      },
      include: {
        children: true,
      },
    });
    dbResult.forEach((item) => {
      children.push(item.children.user_uid);
    });
  }
  if (authorizable.access === 'account' && authorizable.token) {
    const user = await getUser(authorizable.token);
    const dbResult = await prisma.children.findMany({
      where: {
        user_uid: user?.id,
      },
    });
    dbResult.forEach((item) => {
      children.push(item.user_uid);
    });
  }
  return children;
}

export async function getChild(uuid: string): Promise<Children | null> {
  const result = await prisma.children.findFirst({
    where: {
      user_uid: uuid,
    },
  });
  return result;
}

export async function getRecipient(
  inviteHash: string
): Promise<InviteHash | null> {
  const res = await prisma.inviteHash.findFirst({
    where: {
      hash: inviteHash,
    },
  });
  return res;
}

export async function getEligableUsers(
  childID: ChildUUID | null | undefined
): Promise<string[]> {
  if (!childID) return [];
  const result = await prisma.accessHashTable.findMany({
    where: {
      children: {
        user_uid: childID,
      },
    },
    include: {
      children: true,
    },
  });
  const users = result.map((item) => item.recipient || '');
  return users;
}
