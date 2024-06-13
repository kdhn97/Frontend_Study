const fetcher = (url) => {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
      }
  
      return {
        error: true
      }
    })
  }

  export default fetcher