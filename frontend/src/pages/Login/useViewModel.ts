import React, { useState } from 'react'
import { API_URL } from "src/config"
import { useUserContext } from 'src/stores/UserContext';
import { authRepository } from 'src/di';
console.log({ API_URL })

const LoginViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { onUpdateUser } = useUserContext();

  const loginHandler = async (email: string, password: string) => {
    setError(null);
    try {
      setIsLoading(true);

      const res = await authRepository.login(email, password);

      onUpdateUser(res.user, res.credentials);

      // TODO: go to dashboard
    } catch (error: any) {
      setError(new Error(error.message))
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    onLogin: loginHandler,
  }
}

export default LoginViewModel