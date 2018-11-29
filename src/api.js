class Api {
  constructor() {
    this.baseUri = 'http://localhost:3000'
  }

   getDogs() {
    const endpoint = `/pups/`
    const options = {
      method: 'GET'
    }
    return this._fetchJson(endpoint, options)
  }

   _fetchJson(endpoint, options) {
    return fetch(`${this.baseUri}${endpoint}`, options)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
  }
} 