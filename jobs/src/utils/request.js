const API_DOMAIN = "http://localhost:3000/";

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = response.json();
    return result;

}

export const post = async (path,options) => {

    const response = await fetch(API_DOMAIN + path,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
};

export const deletee = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
    });

    // Chờ và trả kết quả JSON
    const result = await response.json();
    return result;
};


export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(options),
    });

    const result = await response.json();
    return result;
};

