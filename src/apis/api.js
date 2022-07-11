import { BASE_URL, BASE_URL2 } from "./urls";
class XHR {
  static defaultHeaders() {
    return {
      Accept: "application/json",
      "x-api-key": "X_API_KEY",
      "Content-Type": "application/json",
    };
  }
  static get(url, headers) {
    return this.xhr(url, null, "GET", headers);
  }

  static post(url, params, headers = null) {
    return this.xhr(url, params, "POST", headers);
  }

  static xhr(url, params, verb, headers) {
    let options = Object.assign(
      { method: verb },
      params ? { body: params } : null
    );
    if (headers) {
      options.headers = headers;
    }

    let finalUrl = BASE_URL + url;
    console.log("headers headers is", finalUrl, options);

    return fetch(finalUrl, params ? options : options)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }
}
export default XHR;
