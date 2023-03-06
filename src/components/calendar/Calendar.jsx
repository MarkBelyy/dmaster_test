import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Monitor from './Monitor'
import CalendarGrid from './CalendarGrid'
import InputBlock from './InputBlock'
import CalendarPattern from './CalendarPattern'
import Day from './Day'
import _ from 'lodash';
import { isObjectInArray, parseDate, 
  checkObjSinArray, getYearPatternDays, 
  getPatternDays, getNextPatternDays, 
  getPrevPatternDays, 
  getIgonoreDays } from './CalendarFunc'
  import { CalendarFetch } from './CalendarFetch'
  import instance from '../../services/api'
const CalendarBlock = styled.div`
    display: flex;
    // justify-content: space-around;
`

export default function Calendar() {
  const [isRed, setIsRed] = useState([])
  const [ignoreOnDays, setIgnoreOnDays] = useState([])
  const [ignoreOffDays, setIgnoreOffDays] = useState([])
  const [patternDays, setPatternDays] = useState([])
  const [startDateOn, setStartDateOn] = useState(null);
  const [endDateOn, setEndDateOn] = useState(null);
  const [startDateOff, setStartDateOff] = useState(null);
  const [endDateOff, setEndDateOff] = useState(null);
  const [patGet, setPatGet] = useState([]);
  const [exepOnGet, setExepOnGet] = useState([]);
  const [exepOffGet, setExepOffGet] = useState([]);
  const [successful, setSuccessful] = useState(false)
  const [selectedDay, setSelectedDay] = useState(false)

  moment.updateLocale("ru", {
    week: {
      dow: 1, // First day of week is Monday
      doy: 7  // First week of year must contain 1 January (7 + 1 - 1)
    }
  });

  const [tempday, setTempday] = useState(moment());
  useEffect(() => {
    setTempday(moment())
  }, [])


  const startDay = tempday.clone().startOf('month').startOf('week').subtract(1, 'd');
  const prevMonth = () => setTempday(tempday.subtract(1, 'month').clone()) //post data
  const nextMonth = () => setTempday(tempday.add(1, 'month').clone()); //post data
  const goToday = () => setTempday(moment()); //post data
  const ResetMonth = () => {
    setIsRed([])
    setPatternDays([])
    setIgnoreOnDays([])
    setIgnoreOffDays([])
    //get data
  }

  console.log(`До изменений startDay: ${startDay}, tempday: ${tempday}`);

  console.log(`startDay: ${startDay}, tempday: ${tempday}`);

  const day = startDay.clone()
  const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())

  // setIgnoreOnDays([])
  // setIgnoreOffDays([])
  // get data

  // useEffect(() => {
  //   CalendarFetch(tempday, successful, patGet, setPatGet).then(() => {
  //     setSuccessful(true)
  //   })
  // }, [tempday, successful])
  
  useEffect(() => {
    if(!successful){
      setIgnoreOnDays([])
      setIgnoreOffDays([])
      const prevmonth = +tempday.format('M') - 1
      const nextmonth = +tempday.format('M') + 1
      
      Promise.all([
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        const data = responses.flatMap(response => response.data)
        setPatGet(prevPatget => prevPatget.concat(data))
        console.log(patGet); // выводим данные в консоль
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });

      Promise.all([
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        const data = responses.flatMap(response => response.data)
        setExepOnGet(prevExepOnGet => prevExepOnGet.concat(data))
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });

      Promise.all([
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        const data = responses.flatMap(response => response.data)
        setExepOffGet(prevExepOffGet => prevExepOffGet.concat(data))
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });
  
      setSuccessful(true)
    }
  }, [tempday, successful])

  useEffect(() => {
      /* if(patGet){ */
      /* setIsRed([]) */if(patGet){
      setPatternDays(patternDays.concat(checkObjSinArray(patGet, patternDays)))
      console.log('паттерны обновлены')
      }
      /* setIgnoreOnDays(ignoreOnDays.concat(checkObjSinArray(ionget, ignoreOnDays)))
      setIgnoreOffDays(ignoreOffDays.concat(checkObjSinArray(ioffget, ignoreOffDays))) */
      // setSuccesful(true)
      /* } */
  }, [successful, patGet])

  useEffect(() => {
    if(exepOnGet){
    setPatternDays(ignoreOnDays.concat(checkObjSinArray(exepOnGet, ignoreOnDays)))
    console.log('паттерны обновлены')
    }
}, [successful, exepOnGet])

useEffect(() => {
  if(exepOffGet){
  setPatternDays(ignoreOffDays.concat(checkObjSinArray(exepOffGet, ignoreOffDays)))
  console.log('паттерны обновлены')
  } 
}, [successful, exepOffGet])

  useEffect(() => {
      if (patternDays) {
          for (let i = 0; i < patternDays.length; i++) {
              if (patternDays[i].month === 13 && patternDays[i].year === +tempday.format('YYYY')) {
                  let arrpy = getYearPatternDays(patternDays[i].weekday, daysArray)
                  setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrpy)));
              } else if (patternDays[i].month === +tempday.format('M')) {
                  let arrp = getPatternDays(patternDays[i].weekday, daysArray)
                  setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
              } else if (patternDays[i].month === +tempday.format('M')+1) {
                  let arrp = getNextPatternDays(patternDays[i].weekday, daysArray)
                  setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
              } else if (patternDays[i].month === +tempday.format('M')-1) {
                  let arrp = getPrevPatternDays(patternDays[i].weekday, daysArray)
                  setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
              }    
          }
      } 
  }, [patternDays, tempday])

  useEffect(() => {
    if (ignoreOnDays) {
        for (let i = 0; i < ignoreOnDays.length; i++) {
            let ionarr = getIgonoreDays(parseDate(ignoreOnDays[i])[0], parseDate(ignoreOnDays[i])[1])
            console.log('ionarr: ', ionarr)
            setIsRed(prevIsRed => prevIsRed.filter(item => !ionarr.includes(item)))
        }
    }
    
}, [ignoreOffDays, tempday])

useEffect(() => {

  if (ignoreOffDays) {
      for (let i = 0; i < ignoreOffDays.length; i++) {
          let ioffarr = getIgonoreDays(parseDate(ignoreOffDays[i])[0], parseDate(ignoreOffDays[i])[1])
          console.log('ioffarr: ', ioffarr)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(ioffarr)));
      }
  }
}, [ignoreOffDays, tempday])

useEffect(() => {
  if (startDateOn && endDateOn) {
      let ignoreon = {
          startday: +startDateOn.format('DD'),
          startmonth: +startDateOn.format('MM'),
          startyear: +startDateOn.format('YYYY'),
          endday: +endDateOn.format('DD'),
          endmonth: +endDateOn.format('MM'),
          endyear: +endDateOn.format('YYYY')
      }

      console.log(!isObjectInArray(ignoreOnDays, ignoreon))
      if (!isObjectInArray(ignoreOnDays, ignoreon)) {
          setIgnoreOnDays([...ignoreOnDays, ignoreon])
      }
      let arron = getIgonoreDays(startDateOn, endDateOn)
      let arr = isRed.filter(item => !arron.includes(item))
      setIsRed(arr)
  }
}, [startDateOn, endDateOn])

useEffect(() => {
  if (startDateOff && endDateOff) {
      let ignoreoff = {
          startday: +startDateOff.format('DD'),
          startmonth: +startDateOff.format('MM'),
          startyear: +startDateOff.format('YYYY'),
          endday: +endDateOff.format('DD'),
          endmonth: +endDateOff.format('MM'),
          endyear: +endDateOff.format('YYYY')
      }
      if (!isObjectInArray(ignoreOffDays, ignoreoff)) {
          setIgnoreOffDays([...ignoreOffDays, ignoreoff])
      }
      let arroff = getIgonoreDays(startDateOff, endDateOff)
      let arr = arroff.filter(item => !isRed.includes(item))
      setIsRed(isRed.concat(arr))
  }
}, [startDateOff, endDateOff])


// useEffect(() => {
//   console.log(`isRed:${isRed}`)
// }, [isRed])

useEffect(() => {
  console.log('patternDays:')
  console.log(patternDays)
}, [patternDays])

useEffect(() => {
  console.log('ignoreOnDays:')
  console.log(ignoreOnDays)
}, [ignoreOnDays])

useEffect(() => {
  console.log('ignoreOffDays:')
  console.log(ignoreOffDays)
}, [ignoreOffDays])

// useEffect(() => {
//   console.log('patGet:')
//   console.log(patGet)
// }, [patGet])

useEffect(() => {
  console.log('selectedDay:')
  console.log(selectedDay)
}, [selectedDay])


const OnClickCell = (weekday_, weekday) => {
  let elems = document.querySelector('.selectignore:checked');

  if (document.querySelector('.selectignore:checked')) {
      let selectmode = +elems.value
      if (selectmode === 1) {
          console.log("Задаем паттерн")
          let arrp = getPatternDays(weekday_, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));

          let pattern = {
              year: +tempday.format('YYYY'),
              month: +tempday.format('MM'),
              weekday: +weekday_
          }
          console.log(pattern)
          console.log(!isObjectInArray(patternDays, pattern))
          if (!isObjectInArray(patternDays, pattern)) {
              setPatternDays([...patternDays, pattern])
          }

      } else if (selectmode === 2) {
          console.log("Задаем паттерн")
          let arryp = getYearPatternDays(weekday_, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arryp)));

          let ypattern = {
              year: +tempday.format('YYYY'),
              month: +13,
              weekday: +weekday_
          }
          console.log(!isObjectInArray(patternDays, ypattern))
          console.log(ypattern)
          if (!isObjectInArray(patternDays, ypattern)) {
              setPatternDays([...patternDays, ypattern])
          }

      } else if (selectmode === 3) {
          console.log("Задаем рабочие")
          if (!startDateOn) {
              console.log("Первый день1:", weekday)
              setStartDateOn(weekday);
          } else if (startDateOn && !endDateOn) {
              console.log("Второй день:", weekday)
              setEndDateOn(weekday);
          } else {
              console.log("Первый день2:", weekday)
              setStartDateOn(weekday);
              setEndDateOn(null);
          }

      } else if (selectmode === 4) {
          console.log("Задаем выходные")

          if (!startDateOff) {
              console.log("Первый день1:", weekday)
              setStartDateOff(weekday);
          } else if (startDateOff && !endDateOff) {
              console.log("Второй день:", weekday)
              setEndDateOff(weekday);
          } else {
              console.log("Первый день2:", weekday)
              setStartDateOff(weekday);
              setEndDateOff(null);
          }
      } 
  } else {
    console.log(weekday.format('DDMMYYYY'))
    setSelectedDay(weekday.format('DDMMYYYY'))
   }
}

  return (
    <CalendarBlock>
      <div>
        <h2>Календарь</h2>
        <Monitor
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          goToday={goToday}
          tempday={tempday}
        />
        <CalendarGrid
          isRed={isRed} setIsRed={setIsRed}
          OnClickCell={OnClickCell}
          daysArray={daysArray}
        />
        <InputBlock
          ResetMonth={ResetMonth}
        />
      </div>
      <CalendarPattern
        patternDays={patternDays}
        setPatternDays={setPatternDays} />
      <Day 
      selectedDay={selectedDay}
      />
    </CalendarBlock>
  )
}