import { ReactNode } from "react";

export type UserType = {
  id: string;
  name: string;
  avatar: string;
}

export type AuthContextPropsType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};

export type AuthContextProviderPropsType = {
  children: ReactNode;
};