import React, { useEffect, useState } from 'react'
import moment from 'moment'

import styled, { keyframes } from 'styled-components'

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
        isRed,
        OnClickCell,
        daysArray
    }) {

return (
    <div>
        <GridWrapper>
            {
                daysArray.map((dayItem) => (
                    <CellWrapper onClick={() => {
                        // OnClickCell(dayItem.day(), +dayItem.format('D'));
                        OnClickCell(dayItem.day(), dayItem);
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