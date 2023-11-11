// for every URL path that starts with /api/, send request to upstream API service
var customResolverApi = function (host, url, req) {
    if (/^\/api\//.test(url)) {
        return 'http://localhost:3001';
    }
};
var defaultResolver = function (host, url, req) {
    return 'http://localhost:3000'
}

// assign high priority
customResolverApi.priority = 100;

var proxy = new require('redbird')({
    port: 8080,
    resolvers: [
        customResolverApi,
        defaultResolver,
    ]
})
