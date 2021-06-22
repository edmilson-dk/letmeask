import { useState } from "react";
import { createContext, ReactNode } from "react";

import { auth, firebase } from "../../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextPropsType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderPropsType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextPropsType);

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
  const [user, setUser] = useState<UserType>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from google account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
