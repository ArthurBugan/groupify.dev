const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// GET Request
const get = async (url: string, headers: any = {}) => {
  try {
    const response = await fetch(base_url + url, {
      credentials: 'include',
      method: 'GET',
      headers
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
      throw { responseBody, status: response.status };
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
}

const put = (url: string) => {
  // PUT Request
  fetch(base_url + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: 'updated value'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('PUT Response:', data);
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
}

const del = (url: string) => {
  // DELETE Request
  fetch(base_url + url, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Resource deleted successfully');
      } else {
        console.error('Failed to delete resource');
      }
    })
    .catch(error => {
      console.error('Error deleting resource:', error);
    });

}

export { get, post, put, del }