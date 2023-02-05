import { createContext, useContext, useState, useEffect } from "react";
import { getAllPasses } from "../backend";

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [availablePasses, setPasses] = useState([]);

  async function setAvailablePasses(passFromWallet = []) {
    if (passFromWallet.length <= 0) return [];
    const { passes } = await getAllPasses();
    const canUses = passFromWallet.filter(
      (pass) =>
        !passes.some(({ fingerprint }) => pass.fingerprint === fingerprint)
    );
    setPasses(canUses);
  }

  return (
    <AppContext.Provider
      value={{
        availablePasses,
        setAvailablePasses,
        setPasses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
