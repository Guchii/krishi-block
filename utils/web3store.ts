import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Web3State {
  isInstalledWallet: boolean;
  isConnected: boolean;
  connectedAddress: string | null;
  setIsConnected: (pay: boolean) => void;
  setIsInstalledWallet: (pay: boolean) => void;
  setConnectedAddress: (pay: string | null) => void;
}

const useWeb3Store = create<Web3State>()(
  devtools(
    persist(
      (set) => ({
        isInstalledWallet: false,
        isConnected: false,
        connectedAddress: null,
        setIsConnected: (pay) => set((state) => ({ isConnected: pay })),
        setIsInstalledWallet: (pay) =>
          set((state) => ({ isInstalledWallet: pay })),
        setConnectedAddress: (pay) =>
          set((state) => ({ connectedAddress: pay })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useWeb3Store;
