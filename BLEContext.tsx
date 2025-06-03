import React, { createContext, useContext } from "react";
import useBLE from "./useBLE";

const BLEContext = createContext<ReturnType<typeof useBLE> | null>(null);

export const BLEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ble = useBLE();
  return <BLEContext.Provider value={ble}>{children}</BLEContext.Provider>;
};

export const useBLEContext = () => {
  const ctx = useContext(BLEContext);
  if (!ctx) throw new Error("useBLEContext must be used within BLEProvider");
  return ctx;
};
