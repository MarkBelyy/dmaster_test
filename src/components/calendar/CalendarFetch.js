import instance from '../../services/api'

export const CalendarFetch = (tempday, successful, patget, setPatget) => {
  return new Promise((resolve, reject) => {
    if (!successful) {
      // setIgnoreOnDays([])
      // setIgnoreOffDays([])
      // get data
      const prevmonth = +tempday.format('M') - 1
      const nextmonth = +tempday.format('M') + 1

      Promise.all([
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        const data = responses.flatMap(response => response.data)
        setPatget(prevPatget => prevPatget.concat(data))
        console.log(patget); // выводим данные в консоль
        resolve()
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
        reject(error)
      });
    } else {
      resolve()
    }
  })
}