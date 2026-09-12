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

// Complete set of 24 canonical pre-rendered HTML routes
const VALID_ROUTES = new Set([
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/methodology',
  // Category pages
  '/calculators/false-ceilings-drywall',
  '/calculators/construction-finishing',
  '/calculators/real-estate-financial',
  // 15 Calculators
  '/calculators/ba13-drywall-ceiling',
  '/calculators/pvc-panel-ceiling',
  '/calculators/acoustic-grid-ceiling',
  '/calculators/cove-ceiling',
  '/calculators/plaster-staff-ceiling',
  '/calculators/paint-primer',
  '/calculators/tiles-estimator',
  '/calculators/concrete-volume',
  '/calculators/bricks-blocks',
  '/calculators/ac-btu-size',
  '/calculators/mortgage-piti',
  '/calculators/rental-yield',
  '/calculators/affordability-calc',
  '/calculators/closing-costs',
  '/calculators/wallpaper-roll',
]);

/**
 * Cloudflare Pages Functions catch-all handler.
 * Ensures non-existent routes return a genuine HTTP 404 status code (not 200 OK)
 * with X-Robots-Tag: noindex, follow, preventing soft-404 indexing penalties.
 */
export async function onRequest(context: EventContext): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  // Normalize path by stripping trailing slashes
  const rawPath = url.pathname;
  const normalizedPath = (rawPath.length > 1 && rawPath.endsWith('/')) 
    ? rawPath.slice(0, -1) 
    : rawPath;

  const isStaticAsset = (
    normalizedPath.startsWith('/assets/') ||
    normalizedPath.startsWith('/images/') ||
    /\.(js|css|png|jpg|jpeg|svg|ico|webp|xml|txt|json|woff2?|ttf|eot)$/i.test(normalizedPath)
  );

  // Helper to fetch and return real 404 response
  const return404 = async (): Promise<Response> => {
    try {
      const notFoundUrl = new URL('/404.html', url.origin);
      const notFoundResponse = await env.ASSETS.fetch(notFoundUrl.toString());
      const headers = new Headers(notFoundResponse.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('X-Robots-Tag', 'noindex, follow');
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

      return new Response(notFoundResponse.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
    } catch {
      return new Response('404 Not Found — Resource does not exist on ArchEstate Pro', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, follow',
        },
      });
    }
  };

    // Special handling for /ads.txt: Must NEVER return HTML
    if (normalizedPath === '/ads.txt') {
      try {
        const adsResponse = await env.ASSETS.fetch(request);
        const ct = adsResponse.headers.get('Content-Type') || '';
        if (adsResponse.status === 200 && !ct.includes('text/html')) {
          return adsResponse;
        }
      } catch {}
      return new Response('# No active ads.txt entries configured yet.\n', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, follow',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

  // If path is an HTML navigation and NOT in the valid routes set -> immediate genuine 404
  if (!isStaticAsset && normalizedPath !== '/404.html' && !VALID_ROUTES.has(normalizedPath)) {
    return return404();
  }

  // Attempt to serve the static asset
  const response = await env.ASSETS.fetch(request);
  if (response.status === 404) {
    return return404();
  }

  return response;
}
