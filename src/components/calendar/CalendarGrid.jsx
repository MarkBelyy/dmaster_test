import React, { useEffect, useState } from 'react'
import moment from 'moment'
import _ from 'lodash';
import styled from 'styled-components'
import instance from '../../services/api'

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 1px;
    background-color: rgb(230, 230, 230);
    max-width: 710px;
    border: 1px solid rgb(230, 230, 230);
`
const CellWrapper = styled.div.attrs({
    className: 'cellwrapper',
})`
    min-width: 40px;
    min-height: 63px;
    background-color: ${props => props.isWeekend ? '#f2f2f2' : '#ffffff'};
    background-color: ${props => (props.isDayRed) ? '#f4d9d9' : ''};
`
const RowCell = styled.div`
    display: flex;
    justify-content: ${props => props.flexend ? 'flex-end' : 'flex-start'};
`

const DayWrapper = styled.div`
    width:30px;
    height: 30px;
    border-radius: 20px;
    margin: 10px 10px 10px 10px;
    display: flex;
    
    background-color: ${props => props.isCurentDay ? 'red' : ''};
    align-items: center;
    justify-content: center
`
const CurrentDay = styled.div`
    color: ${props => !props.isThisMonth ? 'gray' : ''}
`


export default function CalendarGrid(
    {
        tempday, startDay, isRed,
        setIsRed, ignoreOnDays,
        setIgnoreOnDays, ignoreOffDays,
        setIgnoreOffDays, patternDays,
        setPatternDays
    }) {

    const [startDateOn, setStartDateOn] = useState(null);
    const [endDateOn, setEndDateOn] = useState(null);
    const [startDateOff, setStartDateOff] = useState(null);
    const [endDateOff, setEndDateOff] = useState(null);
const [patget, setPatget] = useState([]);
    const [successful, setSuccessful] = useState(false)

    const day = startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())


    const getPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => item.format('M') === daysArray[20].format('M'))

        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getNextPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => +item.format('M') === +daysArray[20].format('M')+1)

        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getPrevPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => +item.format('M') === +daysArray[20].format('M')-1)

        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getYearPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getIgonoreDays = (firstday, lastday) => {
        let n = lastday.diff(firstday, 'days')
        firstday.subtract(1, 'd')
        let arr = [...Array(n + 1)].map(() => firstday.add(1, 'd').clone().format('DDMMYYYY'))
        return arr
    }
    const isObjectInArray = (arr, obj) => {
        return arr.some(item => JSON.stringify(item) === JSON.stringify(obj));
    }
    const checkObjSinArray = (objsget, oldobjs) => {
        let uobj = []
        for (let i = 0; i < objsget.length; i++) {
            if (!isObjectInArray(oldobjs, objsget[i])) {
                uobj = [...uobj, objsget[i]]
            }
        }
        return uobj
    }
    const parseDate = (dateObj) => {

        const startDate = moment(`${dateObj.startyear}-${dateObj.startmonth}-${dateObj.startday}`, "YYYY-MM-DD");
        const endDate = moment(`${dateObj.endyear}-${dateObj.endmonth}-${dateObj.endday}`, "YYYY-MM-DD");
        console.log('startdata', startDate); // Выводит "05.02.2023"
        console.log('enddata', endDate); // Выводит "19.02.2023"
        return [startDate, endDate];
    }

    useEffect(() => {
  if(!successful){
    setIgnoreOnDays([])
    setIgnoreOffDays([])
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
    }).catch(error => {
      console.error(error); // выводим ошибку в консоль
    });

    setSuccessful(true)
  }
}, [tempday, successful])

    useEffect(() => {
        /* if(patget){ */
        /* setIsRed([]) */if(patget){
        setPatternDays(patternDays.concat(checkObjSinArray(patget, patternDays)))
        console.log('паттерны обновлены')
        }
        /* setIgnoreOnDays(ignoreOnDays.concat(checkObjSinArray(ionget, ignoreOnDays)))
        setIgnoreOffDays(ignoreOffDays.concat(checkObjSinArray(ioffget, ignoreOffDays))) */
        // setSuccesful(true)
        /* } */
    }, [successful, patget])

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
        if (ignoreOffDays) {
            for (let i = 0; i < ignoreOffDays.length; i++) {
                let ioffarr = getIgonoreDays(parseDate(ignoreOffDays[i])[0], parseDate(ignoreOffDays[i])[1])
                console.log('ioffarr: ', ioffarr)
                setIsRed(prevIsRed => _.uniq(prevIsRed.concat(ioffarr)));
            }
        }
        if (ignoreOnDays) {
            for (let i = 0; i < ignoreOnDays.length; i++) {
                let ionarr = getIgonoreDays(parseDate(ignoreOnDays[i])[0], parseDate(ignoreOnDays[i])[1])
                console.log('ionarr: ', ionarr)
                setIsRed(prevIsRed => prevIsRed.filter(item => !ionarr.includes(item)))
            }
        }
        
    }
    , [patternDays, tempday])

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


useEffect(() => {
    console.log(`isRed:${isRed}`)
}, [isRed])

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

useEffect(() => {
    console.log('patget:')
    console.log(patget)
}, [patget])


const OnClickCell2 = (weekday_, weekday) => {
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
    }
}



return (
    <div>
        <GridWrapper>
            {
                daysArray.map((dayItem) => (
                    <CellWrapper onClick={() => {
                        // OnClickCell(dayItem.day(), +dayItem.format('D'));
                        OnClickCell2(dayItem.day(), dayItem);
                    }}

                        key={dayItem.format('DDMMYYYY')}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                        isDayRed={isRed.includes(dayItem.format('DDMMYYYY'))}
                    >
                        <RowCell id={dayItem.format('DDMMYYYY')} flexend>
                            <DayWrapper
                                isCurentDay={dayItem.format('DDMMYYYY') === moment().format('DDMMYYYY')}
                            >
                                <CurrentDay
                                    isThisMonth={dayItem.format('M') === daysArray[20].format('M')}
                                >
                                    {dayItem.format('D')}
                                </CurrentDay>
                            </DayWrapper>
                        </RowCell>
                    </CellWrapper>
                ))
            }
        </GridWrapper>


    </div>
)
}