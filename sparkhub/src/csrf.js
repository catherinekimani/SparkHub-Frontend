export async function csrfFetch(url, options = {}) {
  const token = document.cookie.replace(
    /(?:(?:^|;)XSRF-TOKEN=([^;]*))|(?:^.*)/,
    "$1"
  );
  options.headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": token,
    ...options.headers,
  };
  return fetch(url, options);
}
