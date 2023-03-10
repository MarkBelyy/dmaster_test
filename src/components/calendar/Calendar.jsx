import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Monitor from './Monitor'
import CalendarGrid from './CalendarGrid'
import InputBlock from './InputBlock'
import CalendarPattern from './CalendarPattern'
import Day from './Day'
import _ from 'lodash';
import {
  isObjectInArray, parseDate,
  checkObjSinArray, getYearPatternDays,
  getPatternDays, getNextPatternDays,
  getPrevPatternDays,
  getIgonoreDays
} from './CalendarFunc'
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


  const ignoreOnDaysPost = useRef([]);
  const ignoreOffDaysPost = useRef([]);
  const patternDaysPost = useRef([]);

  const [startDateOn, setStartDateOn] = useState(null);
  const [endDateOn, setEndDateOn] = useState(null);
  const [startDateOff, setStartDateOff] = useState(null);
  const [endDateOff, setEndDateOff] = useState(null);
  // const [patGet, setPatGet] = useState([]);
  // const [exepOnGet, setExepOnGet] = useState([]);
  // const [exepOffGet, setExepOffGet] = useState([]);

  const [successful, setSuccessful] = useState(false)
  const [selectedDay, setSelectedDay] = useState(false)

  moment.updateLocale("ru", {
    week: {
      dow: 1, // First day of week is Monday
      doy: 7  // First week of year must contain 1 January (7 + 1 - 1)
    }
  });

  const [tempday, setTempday] = useState(moment());

  // useEffect(() => {
  //   setTempday(moment())
  // }, [])

  const startDay = tempday.clone().startOf('month').startOf('week').subtract(1, 'd')
  const day = startDay.clone()
  const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())

  const prevMonth = () => {
    const prevprevmonth = +tempday.format('M') - 2
    getPrevOrNext(prevprevmonth)
    setTempday(tempday.subtract(1, 'month').clone())
  }
  const nextMonth = () => {
    const nextnextMonth = +tempday.format('M') + 2
    getPrevOrNext(nextnextMonth)
    setTempday(tempday.add(1, 'month').clone())
  }
  const goToday = () => {
    setTempday(moment())
  }
  const ResetMonth = () => {
    setIsRed([])
    setPatternDays([])
    setIgnoreOnDays([])
    setIgnoreOffDays([])
    patternDaysPost.current = 0
    ignoreOnDaysPost.current = 0
    ignoreOffDaysPost.current = 0
    console.log("Reset сработал")
    setSuccessful(false)
  }

  useEffect(() => {
    if (!successful) {
      //начиная от сюда вынести все в функцию
      const prevmonth = +tempday.format('M') - 1
      const nextmonth = +tempday.format('M') + 1

      Promise.all([
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        if (responses.length > 0) {
          const data = responses.flatMap(response => response.data)
          setPatternDays(patternDays.concat(checkObjSinArray(data, patternDays)))
          // setPatGet(prevPatget => prevPatget.concat(data))
        }
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });

      Promise.all([
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        if (responses.length > 0) {
          const data = responses.flatMap(response => response.data)
          setIgnoreOnDays(ignoreOnDays.concat(checkObjSinArray(data, ignoreOnDays)))
          // setExepOnGet(prevExepOnGet => prevExepOnGet.concat(data))
        }
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });

      Promise.all([
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } }),
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: prevmonth } }),
        instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: nextmonth } })
      ]).then(responses => {
        if (responses.length > 0) {
          const data = responses.flatMap(response => response.data)
          setIgnoreOffDays(ignoreOffDays.concat(checkObjSinArray(data, ignoreOffDays)))
          // setExepOffGet(prevExepOffGet => prevExepOffGet.concat(data))
        }
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });
      // до сюда
      setSuccessful(true)
    }
  }, [tempday, successful])

  useEffect(() => {
    if (patternDays) {
      for (let i = 0; i < patternDays.length; i++) {
        if (patternDays[i].month === 13 && patternDays[i].year === +tempday.format('YYYY')) {
          let arrpy = getYearPatternDays(patternDays[i].weekday, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrpy)));
        } else if (patternDays[i].month === +tempday.format('M')) {
          let arrp = getPatternDays(patternDays[i].weekday, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
        } else if (patternDays[i].month === +tempday.format('M') + 1) {
          let arrp = getNextPatternDays(patternDays[i].weekday, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
        } else if (patternDays[i].month === +tempday.format('M') - 1) {
          let arrp = getPrevPatternDays(patternDays[i].weekday, daysArray)
          setIsRed(prevIsRed => _.uniq(prevIsRed.concat(arrp)));
        }
      }
    }
  }, [patternDays, tempday])

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
    if (ignoreOnDays) {
      for (let i = 0; i < ignoreOnDays.length; i++) {
        let ionarr = getIgonoreDays(parseDate(ignoreOnDays[i])[0], parseDate(ignoreOnDays[i])[1])
        console.log('ionarr: ', ionarr)
        setIsRed(prevIsRed => prevIsRed.filter(item => !ionarr.includes(item)))
      }
    }

  }, [ignoreOnDays, tempday])

  useEffect(() => {
    if (startDateOn && endDateOn) {
      let ignoreon = {
        startD: +startDateOn.format('DD'),
        startM: +startDateOn.format('MM'),
        startY: +startDateOn.format('YYYY'),
        finishD: +endDateOn.format('DD'),
        finishM: +endDateOn.format('MM'),
        finishY: +endDateOn.format('YYYY')
      }
      console.log('ignoreon', ignoreon)
      if (!isObjectInArray(ignoreOnDays, ignoreon)) {
        setIgnoreOnDays([...ignoreOnDays, ignoreon])
        ignoreOnDaysPost.current = [...ignoreOnDaysPost.current, ignoreon]
      }
      let arron = getIgonoreDays(startDateOn, endDateOn)
      let arr = isRed.filter(item => !arron.includes(item))
      setIsRed(arr)
    }
  }, [startDateOn, endDateOn])

  useEffect(() => {
    if (startDateOff && endDateOff) {
      let ignoreoff = {
        startD: +startDateOff.format('DD'),
        startM: +startDateOff.format('MM'),
        startY: +startDateOff.format('YYYY'),
        finishD: +endDateOff.format('DD'),
        finishM: +endDateOff.format('MM'),
        finishY: +endDateOff.format('YYYY')
      }
      console.log('ignoreoff', ignoreoff)
      if (!isObjectInArray(ignoreOffDays, ignoreoff)) {
        setIgnoreOffDays([...ignoreOffDays, ignoreoff])
        ignoreOffDaysPost.current = [...ignoreOffDaysPost.current, ignoreoff]
      }
      let arroff = getIgonoreDays(startDateOff, endDateOff)
      let arr = arroff.filter(item => !isRed.includes(item))
      setIsRed(isRed.concat(arr))
    }
  }, [startDateOff, endDateOff])


  // useEffect(() => {
  //   console.log(`isRed:${isRed}`)
  // }, [isRed])

  // useEffect(() => {
  //   console.log('patternDays:')
  //   console.log(patternDays)
  // }, [patternDays])

  // useEffect(() => {
  //   console.log('ignoreOnDays:')
  //   console.log(ignoreOnDays)
  // }, [ignoreOnDays])

  // useEffect(() => {
  //   console.log('ignoreOffDays:')
  //   console.log(ignoreOffDays)
  // }, [ignoreOffDays])

  // useEffect(() => {
  //   console.log('selectedDay:')
  //   console.log(selectedDay)
  // }, [selectedDay])

  const getPrevOrNext = (month) => {
    instance.get('/account/pattern', { params: { year: tempday.format('YYYY'), month: month } }).then(responses => {
      if (responses.data.length > 0) {
        setPatternDays(patternDays.concat(checkObjSinArray(responses.data, patternDays)))
        console.log('паттерны на след месяц загружены и добавлены')
      }
    })
    instance.get('/account/exept/off', { params: { year: tempday.format('YYYY'), month: month } }).then(responses => {
      if (responses.data.length > 0) {
        setIgnoreOffDays(ignoreOffDays.concat(checkObjSinArray(responses.data, ignoreOffDays)))
        console.log('исключения off на след месяц загружены и добавлены')
      }
    })
    instance.get('/account/exept/on', { params: { year: tempday.format('YYYY'), month: month } }).then(responses => {
      if (responses.data.length > 0) {
        setIgnoreOnDays(ignoreOnDays.concat(checkObjSinArray(responses.data, ignoreOnDays)))
        console.log('исключения on на след месяц загружены и добавлены')
      }
    })
  }

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
          patternDaysPost.current = [...patternDaysPost.current, pattern]
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
          patternDaysPost.current = [...patternDaysPost.current, ypattern]
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
          patternDaysPost={patternDaysPost}
          ignoreOnDaysPost={ignoreOnDaysPost}
          ignoreOffDaysPost={ignoreOffDaysPost}
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