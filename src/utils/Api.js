export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
        this._checkResponse = this._checkResponse.bind(this);
        this._token = null;
    }

    _checkResponse(response){
        if(response.ok){
            return response.json();
        }
        return Promise.reject(`${response.status} and ${response.url}`);
    }
    setToken(token){
      this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._baseURL}users/me`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this._token}`,
                    'Content-type': 'application/json'
                }
            }).then(this._checkResponse);
    }

    getPreloadsCards(){
        return fetch(`${this._baseURL}cards/`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this._token}`,
                    'Content-type': 'application/json'
                }
            }).then(this._checkResponse)
    }



    updateUserInfo({fio, aboutYourself}){
        return fetch(`${this._baseURL}users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                name:`${fio}`,
                about: `${aboutYourself}`
            })
        }).then(this._checkResponse);
    }

    postCard({name, link}){
        return  fetch(`${this._baseURL}cards`, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                name:`${name}`,
                link:`${link}`
            })
        }).then(this._checkResponse);
    }
    deleteCard(_id){
        return fetch(`${this._baseURL}cards/${_id}`, {
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    addLike(_id){
        return fetch(`${this._baseURL}cards/${_id}/likes`, {
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }
    deleteLike(_id){
        return fetch(`${this._baseURL}cards/${_id}/likes`, {
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }
    updateAvatar({avatar}){
        return fetch(`${this._baseURL}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${this._token}`,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                    avatar: `${avatar}`
                }
            )
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(_id, isLiked) {
        if (isLiked) {
            return this.addLike(_id);
        }
        return this.deleteLike(_id);
    }
}

export const api = new Api({ baseURL : 'https://api.mesto.photocard.nomoredomains.work/', headers:{
        'Authorization': `Bearer `,
        'Content-Type': 'application/json'
    }});