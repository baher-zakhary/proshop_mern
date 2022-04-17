export class HttpHeaders {
    
    headers = {};

    constructor() {

    }

    setContentType(contentType) {
        this.headers['Content-Type'] = contentType;
    }

    setBearerToken(token) {
        this.setAuthorization(`Bearer ${token}`);
    }

    setAuthorization(authorization) {
        this.headers['Authorization'] = authorization;
    }

    getHeaders() {
        return this.headers;
    }
}