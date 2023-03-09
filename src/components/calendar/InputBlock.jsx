import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    sendData
  } from './CalendarFetch'
const InputDiv = styled.div`
padding-top: 10px;
padding-bottom: 10px;
margin-top: 20px;
    display: flex;
    justify-content: space-around;
    background-color: rgb(230, 230, 230);
    border: 1px solid rgb(230, 230, 230);
    max-width: 710px;
`
const SelectDiv = styled.div`

`


export default function InputBlock({ ResetMonth, patternDaysPost, ignoreOnDaysPost, ignoreOffDaysPost}) {
    const [lastChecked, setLastChecked] = useState(null);

    function uncheckRadioButtons(e) {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked && lastChecked === value) {
            e.target.checked = false;
            setLastChecked(null);
        } else {
            setLastChecked(value);
        }
    }

    return (
        <InputDiv>
            <SelectDiv>
                <p>Выходные на месяц</p>
                <input name='selectignore'
                    className='selectignore'
                    type="radio"
                    id="radioButton"
                    value={1}
                    onClick={uncheckRadioButtons} />
            </SelectDiv>
            <SelectDiv>
                <p>Выходные на год</p>
                <input name='selectignore'
                    className='selectignore'
                    type="radio"
                    id="radioButton2"
                    value={2}
                    onClick={uncheckRadioButtons}
                />
            </SelectDiv>
            <SelectDiv>
                <p>Рабоичие</p>
                <input name='selectignore'
                    className='selectignore'
                    type="radio"
                    id="radioButton3"
                    value={3}
                    onClick={uncheckRadioButtons}
                />
            </SelectDiv>
            <SelectDiv>
                <p>Выходные</p>
                <input name='selectignore'
                    className='selectignore'
                    type="radio"
                    id="radioButton4"
                    value={4}
                    onClick={uncheckRadioButtons}
                />
            </SelectDiv>
            <button onClick={() => sendData(patternDaysPost, ignoreOnDaysPost, ignoreOffDaysPost)}>Применить</button>
            <button
                onClick={ResetMonth}
            >Сброс</button>
        </InputDiv>
    );
}
