import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export const getToken = () => {
  const userToken = localStorage.getItem('token');
  return userToken && userToken;
};

export const setToken = (userToken: string) => {
  localStorage.setItem('token', userToken);
  eventEmitter.emit('tokenChanged', userToken);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  eventEmitter.emit('tokenChanged', null);
};

export const onTokenChange = (callback: (newToken: string | null) => void) => {
  eventEmitter.on('tokenChanged', callback);

  // Return a function that can be used to unsubscribe
  return () => {
    eventEmitter.off('tokenChanged', callback);
  };
};
