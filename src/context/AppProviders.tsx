import { ReactNode } from "react";
import { ViewportProvider } from "./viewport/ViewportContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ViewportProvider>{children}</ViewportProvider>;
}
