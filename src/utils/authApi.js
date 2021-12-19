const baseURL = 'https://auth.nomoreparties.co';

const checkResponse = (response) => {
    if(response.ok){
        return response.json();
    }
    return  Promise.reject(response.status);
}

export const authentication = ({password, email}) => {
    return fetch(`${baseURL}/signup`, {
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
        .then( data => {
            return data;
        })
}
export const login = ({password, email}) => {
    return fetch(`${baseURL}/signin`, {
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
        .then( data => {
            if(data.token){
                localStorage.setItem('jwt', data.token);
                return data;
            }else {
                return;
            }
            return data;
        })
}

export const getUserCredentials = (jwt) => {
    return fetch(`${baseURL}/users/me`, {
        method: 'GET',
        headers:{
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
        }
    }).then(checkResponse).then(({data}) => {

        return data
    });
}
/*
dodiknevova dodik@gmail.com*/
