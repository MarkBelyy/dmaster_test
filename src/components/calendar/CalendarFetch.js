import instance from '../../services/api'

export const sendData = (patternDaysPost, ignoreOnDaysPost, ignoreOffDaysPost) => {
    if (patternDaysPost.length > 0) {
        console.log(patternDaysPost)
        instance.post('/account/pattern', patternDaysPost)
            .catch(error => {
                console.error(error); // выводим ошибку в консоль
            });
    }
    if (ignoreOnDaysPost.length > 0) {
        instance.post('/account/exept/on', ignoreOnDaysPost)
            .catch(error => {
                console.error(error); // выводим ошибку в консоль
            });
    }
    if (ignoreOffDaysPost.length > 0) {
        instance.post('/account/exept/off', ignoreOffDaysPost)
            .catch(error => {
                console.error(error); // выводим ошибку в консоль
            });
    }
}