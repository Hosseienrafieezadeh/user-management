import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
