export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    
    // If the asset exists and is served normally, return it
    if (response.status !== 404) {
      return response;
    }

    // Return the pre-rendered 404.html with a REAL HTTP 404 status code (not 200)
    const notFoundUrl = new URL('/404.html', url.origin);
    const notFoundResponse = await env.ASSETS.fetch(notFoundUrl.toString());

    const headers = new Headers(notFoundResponse.headers);
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('X-Robots-Tag', 'noindex, follow');

    return new Response(notFoundResponse.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    });
  },
};
