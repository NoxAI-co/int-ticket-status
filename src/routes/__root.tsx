import MainLayout from "@/layouts/MainLayout";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Outlet />
        <TanStackRouterDevtools />
      
      </MainLayout>

      <ReactQueryDevtools />
    </QueryClientProvider>
  ),
});
