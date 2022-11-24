import create from "zustand";
import { devtools, persist } from "zustand/middleware";


interface UserState {
  loggedIn: boolean;
  permissionMismatch: boolean;
  user: Partial<User>;
  userType: usertype;
  setUserType: (pay: usertype) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        permissionMismatch: false,
        user: {},
        userType: undefined,
        permissionMismatcher: () =>
          set((state) => ({ permissionMismatch: true })),
        setUserType: (pay) => set((state) => ({userType: pay})),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
