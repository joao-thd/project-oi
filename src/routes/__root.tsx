import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hello Kitty Store — Roblox" },
      { name: "description", content: "Loja de Robux da Hello Kitty Store." },
      { property: "og:title", content: "Hello Kitty Store" },
      { property: "og:description", content: "Hello Kitty Store" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/hello-kitty-store-logo.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => <div style={{padding:40}}><h1>404</h1><Link to="/">Voltar</Link></div>,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
