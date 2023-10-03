import { createContext, useContext } from "react";
import { UserModel } from "../types/UserModel";

type Context = {
  user: null | UserModel;
  signUp: (data: Omit<UserModel, "id">) => Promise<void>;
  signIn: (data: Omit<UserModel, "fullname"| "id">) => Promise<void>;
  logOut: () => Promise<void>;
};

export const authContext = createContext<Context>({
  user: null,
  logOut: async () => Promise.resolve(),
  signIn: async (_) => {
    return Promise.resolve();
  },
  signUp: async (_) => {
    return Promise.resolve();
  },
});

export const useAuthContext = () => useContext(authContext); 
