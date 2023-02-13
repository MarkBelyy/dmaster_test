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

    const [ignoreon, setIgnoreOn] = useState(0)
    const [ignoreoff, setIgnoreOff] = useState(0)
    const [isRed, setIsRed] = useState([])
    const day = props.startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())


    const getPatternDays = (dayweek, daysArray) => {
        let arr = daysArray.filter(item => item.day() === dayweek)
        arr = arr.filter(item => item.format('M') === daysArray[20].format('M'))
        console.log(arr)
        return arr.map(x => +x)
    }
    const getIgonoreDays = (firstday, lastday) => {
        let n = lastday.diff(firstday, 'days')
        firstday.subtract(1, 'd')
        let arr = [...Array(n + 1)].map(() => firstday.add(1, 'd').clone().format('D'))
        console.log(arr)
        return arr
    }
useEffect(() =>{
    const selecteddays = document.querySelectorAll('.cellwrapper');
    console.log(selecteddays);
    selecteddays.forEach(item => {
        item.addEventListener('click', function handleClick(event) {
            console.log('box clicked', event);
            if (ignoreon) item.setAttribute('style', 'background-color: yellow;');
            else if (ignoreoff) item.setAttribute('style', 'background-color: blue;');
        });
    });
}, [ignoreon, ignoreoff])

    
    const OnClickCell2 = (weekday, day) => {
        let elems = document.querySelector('.selectignore:checked');

        if (document.querySelector('.selectignore:checked')) {
            let selectmode = +elems.value
            if (selectmode === 1) {
                console.log("Задаем паттерн")
                setIgnoreOn(0)
                setIgnoreOff(0)
                let a = getPatternDays(weekday, daysArray)
                setIsRed(prev => prev.concat(a).filter((x, i) => isRed.concat(a).indexOf(x) === i));
                console.log(`isRed:${isRed}`)
            

            } else if (selectmode === 3) {
                console.log("Задаем рабочие")
                setIgnoreOn(1)
                setIgnoreOff(0)
            } else if (selectmode === 4) {
                console.log("Задаем выходные")
                
                console.log(`ignoreoff:${ignoreoff}`)
                setIgnoreOn(0)
                setIgnoreOff(1)
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
                            OnClickCell2(dayItem.day(), dayItem.format('D'));
                        }}

                            key={dayItem.format('DDMMYYYY')}
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isDayRed={isRed.includes(+dayItem)}
                        >
                            <RowCell flexend>
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
            <InputBlock
                ResetMonth={ResetMonth}
            />
            <CalendarPattern />
        </div>
    )
}
