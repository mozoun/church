import { prisma } from '@/lib/db';

const GRAPH_VERSION = 'v21.0';
const GRAPH_URL = `https://graph.facebook.com/${GRAPH_VERSION}`;

export function getRedirectUri() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${siteUrl}/api/facebook/callback`;
}

export function getOAuthDialogUrl(state: string) {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID || '',
    redirect_uri: getRedirectUri(),
    scope: 'pages_show_list,pages_manage_posts,pages_read_engagement',
    response_type: 'code',
    state,
  });
  return `https://www.facebook.com/${GRAPH_VERSION}/dialog/oauth?${params.toString()}`;
}

export async function exchangeCodeForUserToken(code: string): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID || '',
    client_secret: process.env.FACEBOOK_APP_SECRET || '',
    redirect_uri: getRedirectUri(),
    code,
  });
  const res = await fetch(`${GRAPH_URL}/oauth/access_token?${params.toString()}`);
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error?.message || 'Failed to exchange code for token');
  }
  return data.access_token;
}

export async function exchangeForLongLivedUserToken(shortLivedToken: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: process.env.FACEBOOK_APP_ID || '',
    client_secret: process.env.FACEBOOK_APP_SECRET || '',
    fb_exchange_token: shortLivedToken,
  });
  const res = await fetch(`${GRAPH_URL}/oauth/access_token?${params.toString()}`);
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error?.message || 'Failed to get long-lived token');
  }
  return data.access_token;
}

interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
}

export async function getManagedPages(userAccessToken: string): Promise<FacebookPage[]> {
  const res = await fetch(`${GRAPH_URL}/me/accounts?access_token=${encodeURIComponent(userAccessToken)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || 'Failed to fetch managed pages');
  }
  return data.data || [];
}

export async function saveFacebookConnection(page: FacebookPage) {
  const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // ~60 days

  const existing = await prisma.facebookConnection.findFirst();
  if (existing) {
    return prisma.facebookConnection.update({
      where: { id: existing.id },
      data: {
        pageId: page.id,
        pageName: page.name,
        accessToken: page.access_token,
        expiresAt,
      },
    });
  }
  return prisma.facebookConnection.create({
    data: {
      pageId: page.id,
      pageName: page.name,
      accessToken: page.access_token,
      expiresAt,
    },
  });
}

export async function getFacebookConnection() {
  return prisma.facebookConnection.findFirst();
}

export async function disconnectFacebook() {
  const existing = await prisma.facebookConnection.findFirst();
  if (existing) {
    await prisma.facebookConnection.delete({ where: { id: existing.id } });
  }
}

export async function postPhotoToPage(imageDataUrl: string, caption: string) {
  const connection = await getFacebookConnection();
  if (!connection) {
    return { posted: false, reason: 'not_connected' as const };
  }

  const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    return { posted: false, reason: 'invalid_image' as const };
  }
  const [, mimeType, base64Data] = match;
  const buffer = Buffer.from(base64Data, 'base64');

  const form = new FormData();
  form.append('caption', caption);
  form.append('access_token', connection.accessToken);
  form.append('source', new Blob([buffer], { type: mimeType }), 'photo.jpg');

  const res = await fetch(`${GRAPH_URL}/${connection.pageId}/photos`, {
    method: 'POST',
    body: form,
  });
  const data = await res.json();

  if (!res.ok) {
    console.error('Facebook photo post failed:', data);
    return { posted: false, reason: 'api_error' as const, error: data.error?.message };
  }

  return { posted: true as const, postId: data.post_id || data.id };
}
