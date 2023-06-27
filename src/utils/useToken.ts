import { EventEmitter } from 'events';
import Cookies from 'js-cookie';

const eventEmitter = new EventEmitter();

export const getToken = () => {
  const userToken = Cookies.get('token');
  return userToken && userToken;
};

export const setToken = (userToken: string) => {
  Cookies.set('token', userToken, { expires: 1 / 48 });
  eventEmitter.emit('tokenChanged', userToken);
};

export const removeToken = () => {
  Cookies.remove('token');
  eventEmitter.emit('tokenChanged', null);
};

export const onTokenChange = (
  callback: (newToken: string | undefined) => void,
) => {
  eventEmitter.on('tokenChanged', callback);

  // Return a function that can be used to unsubscribe
  return () => {
    eventEmitter.off('tokenChanged', callback);
  };
};
