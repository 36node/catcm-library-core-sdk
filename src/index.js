import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    let token = this.token;
    if (typeof token === "function") token = token();
    if (token) return `Bearer ${token}`;

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

  /**
   * library's methods
   */
  library = {
    /**
     * List all library
     *
     * @param {ListLibraryRequest} req listLibrary request
     * @returns {Promise<ListLibraryResponse>} A paged array of library
     */
    listLibrary: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/library`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Find library by id
     *
     * @param {ShowLibraryByIdRequest} req showLibraryById request
     * @returns {Promise<ShowLibraryByIdResponse>} Expected response to a valid request
     */
    showLibraryById: (req = {}) => {
      const { libraryId, headers } = req;

      if (!libraryId)
        throw new Error("libraryId is required for showLibraryById");

      return fetch(`${this.base}/library/${libraryId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
