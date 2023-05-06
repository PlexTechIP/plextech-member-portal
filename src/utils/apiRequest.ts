export const apiRequest = async (
  path: string,
  method: string,
  token?: string | null,
  on401?: () => void,
  bodyData?: any,
) => {
  try {
    let headers: any = {
      'Content-Type': 'application/json',
    };
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
      data.body = JSON.stringify(bodyData);
    }

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + path,
      data,
    );

    if (on401 && (response.status === 401 || response.status === 422)) {
      on401();
    }

    if (!response.ok) {
      console.error(response);
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

    return [true, await response.json()];
  } catch (e: any) {
    console.error(e);
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