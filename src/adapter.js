class JSONAPIAdapter {
  constructor(baseURI) {
    this.baseURI = baseURI
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAll() {
    return fetch(this.baseURI, {
      method: 'GET'
    })
  } 

  get(id) {
    return fetch(`${this.baseURI}/${id}`, {
      method: 'GET'
    })
  }

  post(data) {
    return fetch(this.baseURI, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  patch(id, data) {
    return fetch(`${this.baseURI}/${id}`, {
      method: 'PATCH',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  delete(id) {
    return fetch(`${this.baseURI}/${id}`, {
      method: 'DELETE'
    })
  }
}