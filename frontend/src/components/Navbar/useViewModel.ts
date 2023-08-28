import React from "react";
import { useUserContext } from "src/stores/UserContext";

const useViewModel = () => {
  const { user, onDeleteUser } = useUserContext();

  const logoutHandler = async () => {
    onDeleteUser();
  };

  return {
    user,
    onLogout: logoutHandler,
  };
};

export default useViewModel;
