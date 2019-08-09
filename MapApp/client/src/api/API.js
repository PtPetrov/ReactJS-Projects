const API_URL =
    window.location.hostname === 'localhost' ?
    'http://localhost:5000/api/v1/messages' :
    'production-url-here';


export function getMessages() {
    return fetch(API_URL)
        .then(res => res.json())
        .then(messages => {
            const haveSameLocation = {};
            return messages = messages.reduce((all, message) => {
                const key = `${message.latitude}${message.longitude}`;
                if (haveSameLocation[key]) {
                    haveSameLocation[key].otherMessages =
                        haveSameLocation[key].otherMessages || [];
                    haveSameLocation[key].otherMessages.push(message);
                } else {
                    haveSameLocation[key] = message;
                    all.push(message);
                }
                return all;
            }, []);
        });
}

//Function that get the current location or fetch it from users's IP adress
export function getLocation() {

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

            },
            () => {
                console.log('The user did not give his location. Resolving call to api....');
                resolve(fetch('https://ipapi.co/json')
                    .then(res => res.json())
                    .then(location => {
                        return {
                            lat: location.latitude,
                            lng: location.longitude
                        };
                    }));
            });
    });
}


export function sendMessage(message) {
    return fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(res => res.json());

}