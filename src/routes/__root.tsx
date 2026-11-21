import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import Navbar from "@/site/components/Navbar";
import Footer from "@/site/components/Footer";
import WhatsAppButton from "@/site/components/WhatsAppButton";
import SectionScroller from "@/site/components/SectionScroller";
import { KccJoinProvider } from "@/site/components/kcc/KccContext";
import { FreeClassProvider } from "@/site/components/freeClass/FreeClassContext";
import { LANGUAGE_STORAGE_KEY, LanguageProvider } from "@/site/components/LanguageContext";
import HindiTranslator from "@/site/i18n/HindiTranslator";
import { useSiteNavigate } from "@/site/useSiteNavigate";
import { pagePaths, type Page } from "@/site/page";
import { useLocation } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { assetUrl } from "@/site/assetUrl";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href={assetUrl("/")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Fallback tab title; every page sets its own ("APTCODER | Home", "APTCODER | About Us"…).
      { title: "APTCODER" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      },
      // APTCODER favicon (public/images/brand/favicon.png, squared by scripts/build-favicons.py).
      // Bump ?v= when the icon changes so browsers drop their cached copy.
      { rel: "icon", href: assetUrl("/favicon.ico?v=2"), sizes: "48x48" },
      {
        rel: "icon",
        href: assetUrl("/images/brand/favicon-32x32.png?v=2"),
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        href: assetUrl("/images/brand/favicon-192x192.png?v=2"),
        type: "image/png",
        sizes: "192x192",
      },
      { rel: "apple-touch-icon", href: assetUrl("/images/brand/apple-touch-icon.png?v=2"), sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* If Hindi was chosen last time, keep the page hidden until it has been translated
            (HindiTranslator removes this; it also lifts itself after 2.5 s as a safety net). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem(${JSON.stringify(LANGUAGE_STORAGE_KEY)})==="hi"){var s=document.createElement("style");s.id="hi-pending";s.textContent="body{visibility:hidden}";document.head.appendChild(s);setTimeout(function(){s.remove()},2500)}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <LanguageProvider>
        <SiteLayout />
        <HindiTranslator />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function SiteLayout() {
  const navigate = useSiteNavigate();
  // Static hosting (GitHub Pages) serves pages with a trailing slash, e.g. /school/.
  const pathname = useLocation().pathname.replace(/(.)\/+$/, "$1");
  const current =
    pathname === "/courses" || pathname.startsWith("/courses/")
      ? "courses"
      : ((Object.keys(pagePaths) as Page[]).find((p) => pagePaths[p] === pathname) ?? "home");
  // Legal documents open in their own tab as simple standalone pages (no menu or footer).
  if (pathname === pagePaths.privacy || pathname === pagePaths.terms) return <Outlet />;
  return (
    <KccJoinProvider>
    <FreeClassProvider>
    <div className="min-h-screen bg-white">
      <SectionScroller />
      <Navbar currentPage={current} navigate={navigate} />
      <Outlet />
      <Footer navigate={navigate} />
      {/* Global: appears on every route; pages must not add their own. */}
      <WhatsAppButton />
    </div>
    </FreeClassProvider>
    </KccJoinProvider>
  );
}
