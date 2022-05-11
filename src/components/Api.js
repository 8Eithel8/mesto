// TODO: Для работы с API создайте класс Api. Все запросы должны быть методами этого класса:

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
   // проверяем ответ
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }  else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkRes)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkRes)
    }

    editUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers
        })
            .then(this._checkRes)
    }


    editUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Marie Skłodowska Curie',
                about: 'Physicist and Chemist'
            })
        })
            // .then(res => {
            //     if (res.ok) {
            //         return res.json();
            //     }
            //
            //     // если ошибка, отклоняем промис
            //     return Promise.reject(`Ошибка: ${res.status}`);
            // });
    }

    postNewCard() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
            method: 'POST',
            headers: {
                authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}
}
export const  api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '25211fd8-3e01-4ad9-a1d8-b38f3a1a11d7',
        'Content-Type': 'application/json'
    }
});




