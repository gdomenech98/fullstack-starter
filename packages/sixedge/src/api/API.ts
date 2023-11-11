const API_SERVER_ULR = process.env.API_SERVER_ULR ?? "http://localhost:8080"

export function API(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any, headers?: any, server = API_SERVER_ULR) {
    const reqHeaders = {
        'Content-Type': 'application/json',
        ...headers
    };

    let requestOptions: any = {
        method,
        headers: reqHeaders,
    };

    if (['POST', 'PUT'].includes(method)) {
        requestOptions = {
            ...requestOptions,
            body: JSON.stringify(data ?? {})
        }
    }

    return fetch(server + path, requestOptions)
        .then((response) => {
            if (!response.ok) {
                const responseObj = {
                    status: 'rejected',
                    statusCode: response.status,
                    url: response.url,
                    statusText: response.statusText
                }
                throw Error(JSON.stringify(responseObj));
            }
            return response
        })
        .then(response => response.json())
}

export function UploadFile(path: string, formData: FormData, server = API_SERVER_ULR): Promise<any> {
    return fetch(server + path, {
        method: 'POST',
        body: formData
    })
}