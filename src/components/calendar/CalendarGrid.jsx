import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import InputBlock from './InputBlock'
import CalendarPattern from './CalendarPattern'


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


export default function CalendarGrid(props) {

    const [startDateOn, setStartDateOn] = useState(null);
    const [endDateOn, setEndDateOn] = useState(null);
    const [startDateOff, setStartDateOff] = useState(null);
    const [endDateOff, setEndDateOff] = useState(null);
    const [ignoreOnDays, setIgnoreOnDays] = useState([])
    const [ignoreOffDays, setIgnoreOffDays] = useState([])
    const [patternDays, setPatternDays] = useState([{
        year: 2022,
        month: 2,
        day: 3
    }])

    const [isRed, setIsRed] = useState([])

    const day = props.startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())


    const getPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => item.format('M') === daysArray[20].format('M'))
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
    useEffect(() => {
        // get data
    },[])


    useEffect(() => {
        if (patternDays) {
            for (let i = 0; i < patternDays.length; i++)
                if (patternDays[i].month == 13) {
                    let arrpy =getYearPatternDays(patternDays[i].day, daysArray)
                    setIsRed(prev => prev.concat(arrpy).filter((x, i) => isRed.concat(arrpy).indexOf(x) === i))
                } else if (patternDays[i].month == props.tempday.format('M')) {
                    let arrp = getPatternDays(patternDays[i].day, daysArray)
                    setIsRed(prev => prev.concat(arrp).filter((x, i) => isRed.concat(arrp).indexOf(x) === i))
                }
        } 
    }, [props.tempday])

    useEffect(() => {
        if (startDateOn && endDateOn) {
            let ignoreon = {
                startday: startDateOn.format('D'),
                startmonth: startDateOn.format('M'),
                startyear: startDateOn.format('YYYY'),
                endday: endDateOn.format('D'),
                endmonth: endDateOn.format('M'),
                endyear: endDateOn.format('YYYY')
            }
            setIgnoreOnDays([...ignoreOnDays, ignoreon])
            let arron = getIgonoreDays(startDateOn, endDateOn)
            let arr = isRed.filter(item => !arron.includes(item))
            setIsRed(arr)

        }
    }, [startDateOn, endDateOn])

    useEffect(() => {
        if (startDateOff && endDateOff) {
            let ignoreoff = {
                startday: startDateOff.format('D'),
                startmonth: startDateOff.format('M'),
                startyear: startDateOff.format('YYYY'),
                endday: endDateOff.format('D'),
                endmonth: endDateOff.format('M'),
                endyear: endDateOff.format('YYYY')
            }
            setIgnoreOffDays([...ignoreOffDays, ignoreoff])
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
    

    const OnClickCell2 = (weekday, day) => {
        let elems = document.querySelector('.selectignore:checked');

        if (document.querySelector('.selectignore:checked')) {
            let selectmode = +elems.value
            if (selectmode === 1) {
                console.log("Задаем паттерн")
                let arrp = getPatternDays(weekday, daysArray)
                setIsRed(prev => prev.concat(arrp).filter((x, i) => isRed.concat(arrp).indexOf(x) === i));
                
                let pattern = {
                    year: props.tempday.format('YYYY'),
                    month: props.tempday.format('M'),
                    day: props.tempday.day()
                }
                console.log(pattern)
                setPatternDays([...patternDays, pattern])

            } else if (selectmode === 2) {
                console.log("Задаем паттерн")
                let arryp = getYearPatternDays(weekday, daysArray)
                setIsRed(prev => prev.concat(arryp).filter((x, i) => isRed.concat(arryp).indexOf(x) === i));
                
                let pattern = {
                    year: props.tempday.format('YYYY'),
                    month: 13,
                    day: props.tempday.day()
                }
                console.log(pattern)
                setPatternDays([...patternDays, pattern])

            } else if (selectmode === 3) {
                console.log("Задаем рабочие")
                if (!startDateOn) {
                    console.log("Первый день1:", day)
                    setStartDateOn(day);
                } else if (startDateOff && !endDateOn) {
                    console.log("Второй день:", day)
                    setEndDateOn(day);
                } else {
                    console.log("Первый день2:", day)
                    setStartDateOn(day);
                    setEndDateOn(null);
                }

            } else if (selectmode === 4) {
                console.log("Задаем выходные")

                if (!startDateOff) {
                    console.log("Первый день1:", day)
                    setStartDateOff(day);
                } else if (startDateOff && !endDateOff) {
                    console.log("Второй день:", day)
                    setEndDateOff(day);
                } else {
                    console.log("Первый день2:", day)
                    setStartDateOff(day);
                    setEndDateOff(null);
                }
            }
        }
    }

    const ResetMonth = () => {
        setIsRed([])
        //get data
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
                            id={dayItem.format('DDMMYYYY')}
                        >
                            <RowCell id={dayItem.format('DDMMYYYY')} flexend>
                                <DayWrapper
                                    isCurentDay={dayItem.format('DDMMYYYY') === moment().format('DDMMYYYY')}
                                    id={dayItem.format('DDMMYYYY')}
                                >
                                    <CurrentDay
                                        isThisMonth={dayItem.format('M') === daysArray[20].format('M')}
                                        id={dayItem.format('DDMMYYYY')}
                                    >
                                        {dayItem.format('D')}
                                    </CurrentDay>
                                </DayWrapper>
                            </RowCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
            <InputBlock
                ResetMonth={ResetMonth}
            />
            <CalendarPattern />
        </div>
    )
}
