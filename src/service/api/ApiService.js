import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class ApiService {
    constructor() {
        this._axios = axios;
        this._baseURL = process.env.REACT_APP_BASE_URL;
        this._clientID = process.env.REACT_APP_ACCESS_KEY;
        this._page = 1;
        this._per_page = 20;
        this._defaultURI = 'photos/random';
    }

    _getURL(uri) {
        return this._baseURL + uri;
    }

    _getQueryParams(params) {
        return Object.keys(params).reduce(
            (acc, el, index) => `${acc}${index !== 0 ? '&' : ''}${el}=${params[el]}`,
            '?',
        );
    }

    getResource(uri, page, per_page, query) {
        const client_id = this._clientID;
        const queryParam = query ? { query } : {};
        return this._axios.get(
            this._getURL(uri) +
                this._getQueryParams({
                    client_id,
                    page,
                    per_page,
                    ...queryParam,
                }),
            { crossdomain: true },
        );
    }
}
