import { API_V1 } from "@/constants";

const authService = (() => {
  function putAccessToken(accessToken: string): any {
    localStorage.setItem('accessToken', accessToken);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async function fetchWithAuth(url: any, options: any = {}): Promise<any> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      mode: 'cors',
      credentials: 'include',
    });
  }

  async function register({ name, email, password }: any): Promise<any> {
    const response = await fetch(`${API_V1}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== true) {
      return responseJson;
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function login({ email, password }: any): Promise<any> {
    const response = await fetch(`${API_V1}auth/login/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, authorization } = responseJson;

    if (!status) {
      throw new Error(message);
    }

    if (response.status !== 200) {
      throw new Error(message);
    }

    const { token } = authorization;
    return token;
  }

  async function getProfile(): Promise<any> {
    const response = await fetchWithAuth(`${API_V1}auth/current-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    },);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (response.status !== 200) {
      throw new Error(message);
    }

    if (!status) {
      throw new Error(message);
    }

    return data;
  }

  return {
    getAccessToken,
    putAccessToken,
    fetchWithAuth,
    getProfile,
    register,
    login,
  };
})();

export default authService;