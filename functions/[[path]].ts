interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

interface EventContext {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}

/**
 * Cloudflare Pages Functions catch-all handler.
 * Ensures non-existent routes return a genuine HTTP 404 status code
 * along with the static 404.html template, preventing 200 OK soft-404s.
 */
export async function onRequest(context: EventContext): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1. Attempt to serve the static asset
  const response = await env.ASSETS.fetch(request);
  if (response.status !== 404) {
    return response;
  }

  // 2. Fetch the pre-rendered static 404.html
  const notFoundUrl = new URL('/404.html', url.origin);
  const notFoundResponse = await env.ASSETS.fetch(notFoundUrl.toString());

  // 3. Return real HTTP 404 with noindex robots header
  const headers = new Headers(notFoundResponse.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('X-Robots-Tag', 'noindex, follow');

  return new Response(notFoundResponse.body, {
    status: 404,
    statusText: 'Not Found',
    headers,
  });
}
