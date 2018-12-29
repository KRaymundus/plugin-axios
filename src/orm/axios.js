import axios from 'axios';
import Context from '../common/context'

export default class Axios {
  constructor(http) {
    this.instance = axios.create(http);
    this.setAuthentication(http.access_token);
    
    const context = Context.getInstance();
    if (context.options.onRequest) {
      this.instance.interceptors.request.use(context.options.onRequest)
    }

    this.instance.interceptors.response.use(
      response => http.onResponse(response),
      error => http.onError(error),
    );

    return this.instance;
  }

  setAuthentication(token) {
    if (!token) return;
    const isFunction = typeof token === "function";
    const tokenStr = isFunction ? token() : token;

    this.instance.defaults.headers.common['Authorization'] = `Bearer ${tokenStr}`;
  }

  /**
   * Head Request
   * @param {string} url
   * @param {object} config
   */
  async head(url, config = {}) {
    return this.instance.head(url, config);
  }

  /**
   * GET Request
   * @param {string} url
   * @param {object} config
   */
  async get(url, config = {}) {
    return this.instance.get(url, config);
  }

  /**
   * POST Request
   * @param {string} url
   * @param {object} config
   */
  async post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config);
  }

  /**
   * PATCH Request
   * @param {string} url
   * @param {object} config
   */
  async patch(url, data = {}, config = {}) {
    return this.instance.patch(url, data, config);
  }

  /**
   * PUT Request
   * @param {string} url
   * @param {object} config
   */
  async put(url, data = {}, config = {}) {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE Request
   * @param {string} url
   * @param {object} config
   */
  async delete(url, config = {}) {
    return this.instance.delete(url, config);
  }
}
