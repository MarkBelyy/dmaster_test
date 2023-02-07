import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import InputBlock from './InputBlock'


const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 1px;
    background-color: rgb(230, 230, 230);
    max-width: 710px;
    border: 1px solid rgb(230, 230, 230);
`
const CellWrapper = styled.div`
    min-width: 40px;
    min-height: 63px;
    background-color: ${props => props.isWeekend ? '#f2f2f2' : '#ffffff'};
    // ${props => props.isWeekend ? '#f2f2f2' : '#ffffff'};
    background-color: ${props => (props.isPattern && !props.isIgnorOn || props.isIgnorOff) ? '#f4d9d9' : ''};
    // background-color: ${props => props.isIgnorOn ? '#ffffff' : ''};
    // background-color: ${props => props.isIgnorOff ? 'f4d9d9' : ''};
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
`

export default function CalendarGrid(props) {

    const [pattern, setPattern] = useState([])
    const [ignoreon, setIgnoreOn] = useState([])
    const [ignoreoff, setIgnoreOff] = useState([])
    const day = props.startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())
    const onClickChPattern = () => {
        let elems = document.querySelectorAll('.ch-pattern:checked');
        let arr = [].map.call(elems, function (obj) {
            return +obj.value;
        });
        console.log(`arr: ${arr}`);
        setPattern(arr)
        console.log(`pattern:${pattern}`)
    }

    const onClickChIgnoreOn = () => {
        let elems = document.querySelectorAll('.ch-ignore-on:checked');
        let arr = [].map.call(elems, function (obj) {
            return +obj.value;
        });
        console.log(`arr: ${arr}`);
        setIgnoreOn(arr)
        console.log(`ignoreon:${ignoreon}`)
    }
    const onClickChIgnoreOff = () => {
        let elems = document.querySelectorAll('.ch-ignore-off:checked');
        let arr = [].map.call(elems, function (obj) {
            return +obj.value;
        });
        console.log(`arr: ${arr}`);
        setIgnoreOff(arr)
        console.log(`ignoreoff:${ignoreoff}`)
    }

    const OnClickCell = (dayitem, day) => {
        let elems = document.querySelector('.selectignore:checked');
        
        if (document.querySelector('.selectignore:checked')) {
        let selectmode = +elems.value
        if (selectmode === 1) {
            console.log("Задаем паттерн")
            console.log(dayitem)
            if (!pattern.includes(dayitem)) setPattern((prev) => [...prev, dayitem])
            else setPattern(pattern.filter(x => x != dayitem))
            console.log(`pattern:${pattern}`)
        } else if (selectmode === 2) {
            console.log("Задаем рабочие")
            if (!ignoreon.includes(day)) setIgnoreOn((prev) => [...prev, day])
            else setIgnoreOn(ignoreon.filter(x => x != day))
            console.log(`ignoreon:${ignoreon}`)
        } else if (selectmode === 3) {
            console.log("Задаем выходные")
            if (!ignoreoff.includes(day)) setIgnoreOff((prev) => [...prev, day])
            else setIgnoreOff(ignoreoff.filter(x => x != day))
            console.log(`ignoreoff:${ignoreoff}`)
        }
    }
    }

    return (
        <div>
            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper onClick={() => {
                            OnClickCell(dayItem.day(), +dayItem.format('D'));
                        }}

                            key={dayItem.format('DDMMYYYY')}
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isPattern={pattern.includes(dayItem.day())}
                            isIgnorOn={ignoreon.includes(+dayItem.format('D'))}
                            isIgnorOff={ignoreoff.includes(+dayItem.format('D'))}
                        >
                            <RowCell flexend>
                                <DayWrapper
                                    isCurentDay={dayItem.format('DDMMYYYY') === moment().format('DDMMYYYY')}
                                >
                                    <CurrentDay>
                                        {dayItem.format('D')}
                                    </CurrentDay>
                                </DayWrapper>
                            </RowCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
            <InputBlock
                onClickChPattern={onClickChPattern}
                onClickChIgnoreOn={onClickChIgnoreOn}
                onClickChIgnoreOff={onClickChIgnoreOff}
            />
        </div>
    )
}
