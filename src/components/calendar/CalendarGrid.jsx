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
const DateDN = styled.p`
    display: none;
`

export default function CalendarGrid(props) {

    const [startDateOn, setStartDateOn] = useState(null);
    const [endDateOn, setEndDateOn] = useState(null);
    const [startDateOff, setStartDateOff] = useState(null);
    const [endDateOff, setEndDateOff] = useState(null);

    // const IgnoreOnDays = []
    // const IgnoreOffDays = []
    // const PatternDays = []

    const [isRed, setIsRed] = useState([])

    const day = props.startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())


    const getPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => item.format('M') === daysArray[20].format('M'))
        console.log(arr)
        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getYearPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        console.log(arr)
        return arr.map(x => x.format('DDMMYYYY'))
    }
    const getIgonoreDays = (firstday, lastday) => {
        let n = lastday.diff(firstday, 'days')
        firstday.subtract(1, 'd')
        let arr = [...Array(n + 1)].map(() => firstday.add(1, 'd').clone().format('DDMMYYYY'))
        console.log(arr)
        return arr
    }

    useEffect(() => {
        if (startDateOn && endDateOn) {
            let arron = getIgonoreDays(startDateOn, endDateOn)
            console.log('arron:', arron)
            let arr = isRed.filter(item => !arron.includes(item))
            setIsRed(arr)
            console.log('isRed:', isRed)
        }
    }, [startDateOn, endDateOn])

    useEffect(() => {
        if (startDateOff && endDateOff) {
            let arroff = getIgonoreDays(startDateOff, endDateOff)
            console.log('arroff:', arroff)
            let arr = arroff.filter(item => !isRed.includes(item))
            setIsRed(isRed.concat(arr))
            console.log('isRed:', isRed)
        }
    }, [startDateOff, endDateOff])


    const OnClickCell2 = (weekday, day) => {
        let elems = document.querySelector('.selectignore:checked');

        if (document.querySelector('.selectignore:checked')) {
            let selectmode = +elems.value
            if (selectmode === 1) {
                console.log("Задаем паттерн")
                let arrp = getPatternDays(weekday, daysArray)
                setIsRed(prev => prev.concat(arrp).filter((x, i) => isRed.concat(arrp).indexOf(x) === i));
                console.log(`isRed:${isRed}`)


            } else if (selectmode === 2) {
                console.log("Задаем паттерн")
                let arryp = getYearPatternDays(weekday, daysArray)
                setIsRed(prev => prev.concat(arryp).filter((x, i) => isRed.concat(arryp).indexOf(x) === i));
                console.log(`isRed:${isRed}`)


            } else if (selectmode === 3) {
                console.log("Задаем рабочие")
                if (!startDateOn) {
                    console.log("Первый день1:", day)
                    setStartDateOn(day);
                } else if (!endDateOn) {
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
