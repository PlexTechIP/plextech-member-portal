import { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const userToken = localStorage.getItem('token');
    return userToken && userToken;
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
};

export default useToken;
