const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// GET Request
const get = async (url: string, headers: any = {}) => {
  try {
    const response = await fetch(base_url + url, {
      credentials: 'include',
      method: 'GET',
      headers: {
        ...headers,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw { responseBody, status: response.status };
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}

// POST Request
const post = async (url: string, body: any, headers: any = {}) => {
  try {
    const response = await fetch(base_url + url, {
      credentials: 'include',
      method: 'POST',
      body,
      headers
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw { ...responseBody, status: response.status };
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}

const put = async (url: string, body: any) => {
  try {
    const response = await fetch(base_url + url, {
      credentials: 'include',
      method: 'PUT',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw { responseBody, status: response.status };
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}

const del = async (url: string) => {
  try {
    const response = await fetch(base_url + url, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw { responseBody, status: response.status };
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}

export { get, post, put, del }