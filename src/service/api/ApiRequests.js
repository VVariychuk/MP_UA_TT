import ApiService from './ApiService';

class ApiRequests extends ApiService {
    constructor() {
        super();
        this._searchByQuery = 'search/photos';
        this._random = this._defaultURI;
        this._collections = '';
    }

    getPhotosBySearchQuery(page = this._page, per_page = this._per_page, query = '', orientation = 'landscape') {
        return this.getResource(this._searchByQuery, page, per_page, query, orientation);
    }

    getRandom(page = this._page, per_page = this._per_page, orientation = 'landscape') {
        return this.getResource(this._random, page, per_page, orientation);
    }
}

const requests = new ApiRequests();

export default requests;
