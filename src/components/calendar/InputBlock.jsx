import React from 'react'
import styled from 'styled-components'

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


export default function InputBlock({ ResetMonth }) {
    return (
        <InputDiv>
            <SelectDiv>
                <p>Выходные на месяц</p>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={1} />
            </SelectDiv>
            <SelectDiv>
                <p>Выходные на год</p>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={2} />
            </SelectDiv>
            <SelectDiv>
                <p>Рабочие дни </p>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={3} />
            </SelectDiv>
            <SelectDiv>
                <p>Выходные</p>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={4} />
            </SelectDiv>
            <button>Применить</button>
            <button
                onClick={ResetMonth}
            >Сброс</button>
        </InputDiv>

    )
}
