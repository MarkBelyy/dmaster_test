import instance from '../../services/api'

export const sendData = (patternDaysPost, ignoreOnDaysPost, ignoreOffDaysPost) => {
    console.log(patternDaysPost, ignoreOnDaysPost, ignoreOffDaysPost)
    if (patternDaysPost.current.length > 0) {
        console.log('++++++++++++++++++++++++++++++++++++')
        instance.post('/account/pattern', patternDaysPost.current).catch((error) => {
          console.error(error); // выводим ошибку в консоль
        });
      }
      if (ignoreOnDaysPost.current.length > 0) {
        console.log('++++++++++++++++++++++++++++++++++++')
        instance.post('/account/exept/on', ignoreOnDaysPost.current).catch((error) => {
          console.error(error); // выводим ошибку в консоль
        });
      }
      if (ignoreOffDaysPost.current.length > 0) {
        console.log('++++++++++++++++++++++++++++++++++++')
        instance.post('/account/exept/off', ignoreOffDaysPost.current).catch((error) => {
          console.error(error); // выводим ошибку в консоль
        });
      }
}
