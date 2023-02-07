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
    background-color: #ffffff;
    // ${props => props.isWeekend ? '#f2f2f2' : '#ffffff'};
    background-color: ${props => props.isPattern ? '#f4d9d9' : ''};
    background-color: ${props => props.isIgnorOn ? '#ffffff' : ''};
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
    console.log(moment().format('D'))
    // const [temp, setTempday] = useState(moment())
    const [pattern, setPattern] = useState(Array(7))
    const [ignoreon, setIgnoreOn] = useState(Array(7))

    const day = props.startDay.clone()
    const daysArray = [...Array(42)].map(() => day.add(1, 'd').clone())
    // console.log(`daysArray: ${daysArray}`)
    const onClickChPattern = () => {
        let checkboxs = document.querySelectorAll('.ch-pattern');
        console.log(checkboxs)

        let elems = document.querySelectorAll('.ch-pattern:checked');
        let arr = [].map.call(elems, function (obj) {
            return +obj.value;
        });
        console.log(`arr: ${arr}`);
        setPattern(arr)
        console.log(`pattern:${pattern}`)
        console.log(`pattern include: ${pattern.includes(2)}`)
    }

    const onClickChIgnoreOn = () => {
        let checkboxs = document.querySelectorAll('.ch-ignore-on');
        console.log(checkboxs)

        let elems = document.querySelectorAll('.ch-ignore-on:checked');
        let arr = [].map.call(elems, function (obj) {
            return +obj.value;
        });
        console.log(`arr: ${arr}`);
        setIgnoreOn(arr)
        console.log(`ignoreon:${ignoreon}`)
    }

    return (
        <div>
            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            key={dayItem.format('DDMMYYYY')}
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isPattern={pattern.includes(dayItem.day())}
                            isIgnorOn={ignoreon.includes(+dayItem.format('D'))}
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
            <InputBlock onClickChPattern={onClickChPattern} onClickChIgnoreOn={onClickChIgnoreOn} />
        </div>
    )
}
