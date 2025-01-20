import { getToken, removeToken, setToken } from 'utils/useToken';

export const apiRequest = async (
  path: string,
  method: string,
  bodyData?: any,
  token: string | null = getToken(),
  on401: () => void = removeToken,
) => {
  try {
    let headers: any = {};

    if (!(bodyData instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    let data: any = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    if (bodyData) {
      data.body =
        bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData);
    }

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + path,
      data,
    );

    if (on401 && (response.status === 401 || response.status === 422)) {
      on401();
    }

    if (!response.ok) {
      console.warn(await response.text());
      return [
        false,
        {
          error: {
            errorCode: response.status,
            errorMessage: response.statusText,
          },
        },
      ];
    }

    const res = await response.json();
    if (res.access_token) {
      setToken(res.access_token);
    }

    return [true, res];
  } catch (e: any) {
    console.warn(e);
    return [
      false,
      {
        error: {
          errorMessage: e.toString(),
        },
      },
    ];
  }
};
