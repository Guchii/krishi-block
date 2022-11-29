import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  loggedIn: boolean;
  setLoggedIn: (pay: boolean) => void;
  permissionMismatch: boolean;
  setPermissionMismatch: (pay: boolean) => void;
  user: Partial<User>;
  userType: usertype;
  setUserType: (pay: usertype) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    loggedIn: false,
    permissionMismatch: false,
    user: {},
    userType: undefined,
    setPermissionMismatch: (pay) => set((state) => ({ permissionMismatch: pay })),
    setUserType: (pay) => set((state) => ({ userType: pay })),
    setLoggedIn: (pay) => set((state) => ({ loggedIn: pay })),
  }))
);

export default useUserStore;
