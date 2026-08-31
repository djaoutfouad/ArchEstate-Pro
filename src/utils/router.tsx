import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CATEGORY_ROUTES, ROUTE_TO_CATEGORY_ID } from '../config/site';

export interface RouteState {
  pathname: string;
  calculatorSlug: string | null;
  categoryId: string | null;
  legalType: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null;
}

export function parsePath(pathname: string): RouteState {
  // Normalize path
  let path = (pathname || '/').trim();
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
    };
  }

  // Category pages: /calculators/false-ceilings-drywall, etc.
  if (path.startsWith('/calculators/')) {
    const slug = path.replace('/calculators/', '');
    
    // Check if it's a category slug
    if (ROUTE_TO_CATEGORY_ID[slug]) {
      return {
        pathname: path,
        calculatorSlug: null,
        categoryId: ROUTE_TO_CATEGORY_ID[slug],
        legalType: null,
      };
    }

    // Otherwise it's a calculator slug
    return {
      pathname: path,
      calculatorSlug: slug,
      categoryId: null,
      legalType: null,
    };
  }

  // Legal routes
  if (path === '/contact') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'contact' };
  if (path === '/privacy') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'privacy' };
  if (path === '/terms') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'terms' };
  if (path === '/about') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'about' };
  if (path === '/methodology') return { pathname: path, calculatorSlug: null, categoryId: null, legalType: 'methodology' };

  return {
    pathname: path,
    calculatorSlug: null,
    categoryId: null,
    legalType: null,
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
