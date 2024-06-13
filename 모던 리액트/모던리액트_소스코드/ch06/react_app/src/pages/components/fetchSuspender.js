const fetchSuspender = (url, duration) => {
    let data = null;
    const api = fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
            data = json;
        }, duration);
      });
    return {
      get() {
        if (data === null) {
          throw api;
        } else {
          return data;
        }
      }
    };
}
export default fetchSuspender;
  