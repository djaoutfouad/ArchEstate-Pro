import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CATEGORY_ROUTES, ROUTE_TO_CATEGORY_ID, isValidCalculatorSlug } from '../config/site';

export interface RouteState {
  pathname: string;
  calculatorSlug: string | null;
  categoryId: string | null;
  legalType: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null;
  is404: boolean;
}

export function parsePath(pathname: string): RouteState {
  // Normalize path: strip query string and hash, trim whitespace
  const rawPath = (pathname || '/').split('?')[0].split('#')[0].trim();
  let path = rawPath;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Default home
  if (path === '' || path === '/' || path === '/index.html') {
    return {
      pathname: '/',
      calculatorSlug: null,
      categoryId: null,
      legalType: null,
      is404: false,
    };
  }

  // Explicit 404 page
  if (path === '/404' || path === '/404.html') {
    return {
      pathname: '/404',
      calculatorSlug: null,
      categoryId: null,
      legalType: null,
      is404: true,
    };
  }

  // Category pages: /calculators/false-ceilings-drywall, etc.
  if (path.startsWith('/calculators/')) {
    const slug = path.replace('/calculators/', '');
    
    // Check if it's a valid category slug
    if (ROUTE_TO_CATEGORY_ID[slug]) {
      return {
        pathname: path,
        calculatorSlug: null,
        categoryId: ROUTE_TO_CATEGORY_ID[slug],
        legalType: null,
        is404: false,
      };
    }

    // Check if it's a valid calculator slug
    if (isValidCalculatorSlug(slug)) {
      return {
        pathname: path,
        calculatorSlug: slug,
        categoryId: null,
        legalType: null,
        is404: false,
      };
    }

    // Invalid slug under /calculators/ -> 404
    return {
      pathname: path,
      calculatorSlug: null,
      categoryId: null,
      legalType: null,
      is404: true,
    };
  }

  // Legal routes
  if (path === '/contact') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'contact', is404: false };
  if (path === '/privacy') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'privacy', is404: false };
  if (path === '/terms') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'terms', is404: false };
  if (path === '/about') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'about', is404: false };
  if (path === '/methodology') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'methodology', is404: false };

  // Unknown path -> 404
  return {
    pathname: path,
    calculatorSlug: null,
    categoryId: null,
    legalType: null,
    is404: true,
  };
}

interface RouterContextType extends RouteState {
  navigate: (to: string) => void;
  navigateToCalculator: (slug: string) => void;
  navigateToCategory: (categoryId: string) => void;
  navigateToHome: () => void;
  navigateToLegal: (type: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const navigateToCalculator = useCallback((slug: string) => {
    navigate(`/calculators/${slug}`);
  }, [navigate]);

  const navigateToCategory = useCallback((categoryId: string) => {
    const route = CATEGORY_ROUTES[categoryId] || '/';
    navigate(route);
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToLegal = useCallback((type: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null) => {
    if (!type) {
      // Close modal if on a regular page, or navigate to home if directly on legal page
      if (['/contact', '/privacy', '/terms', '/about', '/methodology'].includes(currentPath)) {
        navigate('/');
      }
    } else {
      navigate(`/${type}`);
    }
  }, [navigate, currentPath]);

  const routeState = parsePath(currentPath);

  const contextValue: RouterContextType = {
    ...routeState,
    navigate,
    navigateToCalculator,
    navigateToCategory,
    navigateToHome,
    navigateToLegal,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
