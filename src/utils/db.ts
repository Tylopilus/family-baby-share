import { PrismaClient } from '@prisma/client';
import type { Children } from '@prisma/client';
import { supabase } from './supabase';
const prisma = new PrismaClient();

type ExtractTypeOfObj<Obj, Key extends keyof Obj> = Pick<Obj, Key>[Key];
export type ChildUUID = ExtractTypeOfObj<Children, 'user_uid'>;

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

export async function getInviteHash(hash: string): Promise<string | null> {
  const result = await prisma.inviteHash.findFirst({
    where: {
      hash,
    },
  });

  if (result) {
    return result.hash;
  }
  return null;
}

export async function createHash(hash: string): Promise<string> {
  const result = await prisma.hash.create({
    data: {
      hash,
      AccessHashTable: { create: [{ childrenId: 1 }] },
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

export function getLoginToken(cookies: string | null): string | undefined {
  if (!cookies) return undefined;
  const loginToken = cookies
    .split('; ')
    .find((item) => item.startsWith('access_token='))
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
  const familyShareAccess = cookies
    ?.split('; ')
    .find((item) => item.startsWith('familyShareAccess='));
  const familyShareAccessToken = familyShareAccess?.split('=')[1];
  const loginToken = getLoginToken(cookies);
  if (loginToken) {
    const { user } = await supabase.auth.api.getUser(loginToken);
    if (user) {
      return {
        loggedIn: true,
        access: 'account',
        token: loginToken,
      };
    }
  }
  if (familyShareAccess) {
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
