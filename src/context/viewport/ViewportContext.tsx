"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ViewportContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isLargeScreen: boolean;
};

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined,
);

export const useViewport: () => ViewportContextType =
  (): ViewportContextType => {
    const context = useContext(ViewportContext);
    if (!context) {
      throw new Error("useViewport must be used within a ViewportProvider");
    }
    return context;
  };

type ViewportProviderProps = {
  children: ReactNode;
};

export function ViewportProvider({ children }: ViewportProviderProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
      setIsLargeScreen(window.innerWidth > 1024);
    };

    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  if (isMobile === null || isTablet === null || isLargeScreen === null) {
    return null;
  }

  return (
    <ViewportContext.Provider value={{ isMobile, isTablet, isLargeScreen }}>
      {children}
    </ViewportContext.Provider>
  );
}
