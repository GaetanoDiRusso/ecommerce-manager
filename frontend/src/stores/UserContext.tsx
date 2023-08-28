import React, { useContext, createContext, useState } from "react";
import { AuthData } from "src/domain/entities/AuthData";
import { User } from "src/domain/entities/User";

type UserContextType = {
  user: User | null;
  onUpdateUser: (newUser: User, authData: AuthData) => void;
  onDeleteUser: () => void;
};

type UserType = UserContextType["user"];

const initialUserContext: UserContextType = {
  user: null,
  onUpdateUser: (newUser: UserType, authData: AuthData) => {},
  onDeleteUser: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const UserContextProvider = ({
  children,
  initialUser = initialUserContext.user,
}: {
  children: React.ReactNode;
  initialUser?: UserType;
}) => {
  const initialUserData = localStorage.getItem("user");
  const userData = initialUserData ? Object.setPrototypeOf(JSON.parse(initialUserData), User) : initialUser;

  const [user, setUser] = useState<UserType>(userData);

  const updateUserHandler = (newUser: UserType, authData: AuthData) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.setItem("authorization", authData.token)
  };

  const deleteUserHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authorization");
  }

  const value = {
    user,
    onUpdateUser: updateUserHandler,
    onDeleteUser: deleteUserHandler
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const { user, onUpdateUser, onDeleteUser } = useContext(UserContext);

  return {
    user,
    onUpdateUser,
    onDeleteUser
  };
};
