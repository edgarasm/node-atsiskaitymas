export const get = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  };

  const res = await fetch('http://localhost:5001/' + url, options);
  return await res.json();
};

export const post = async (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  };

  const res = await fetch('http://localhost:5001/' + url, options);
  return await res.json();
};
