import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import store from "@/states";
import React, { useState } from "react";
import { Provider } from "react-redux";

export default function DefaultLayout({ children }: any) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarExpanded={sidebarExpanded}
              setSidebarExpanded={setSidebarExpanded}
            />
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
              <Header />
              <main className="flex justify-center w-full p-4">{children}</main>
            </div>
          </div>
        </div>
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  );
}
