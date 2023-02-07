import React from 'react'
import styled from 'styled-components'

const ChWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 1px;
    background-color: rgb(230, 230, 230);
    max-width: 200px;
    border: 1px solid rgb(230, 230, 230);
    margin-top: 15px;
`

export default function InputBlock({ onClickChPattern, onClickChIgnoreOn, onClickChIgnoreOff }) {
    return (
        <div>
            <div>
                <div className="pattern-checkboxes">
                    <input type="checkbox" className="ch-pattern" value="1" />
                    <input type="checkbox" className="ch-pattern" value="2" />
                    <input type="checkbox" className="ch-pattern" value="3" />
                    <input type="checkbox" className="ch-pattern" value="4" />
                    <input type="checkbox" className="ch-pattern" value="5" />
                    <input type="checkbox" className="ch-pattern" value="6" />
                    <input type="checkbox" className="ch-pattern" value="0" />
                </div>
                <button
                    onClick={onClickChPattern}
                >Выбрать выходные</button>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={1}  readOnly />
            </div>
            <div>
                <ChWrapper>
                    <input type="checkbox" className="ch-ignore-on" value="1" />
                    <input type="checkbox" className="ch-ignore-on" value="2" />
                    <input type="checkbox" className="ch-ignore-on" value="3" />
                    <input type="checkbox" className="ch-ignore-on" value="4" />
                    <input type="checkbox" className="ch-ignore-on" value="5" />
                    <input type="checkbox" className="ch-ignore-on" value="6" />
                    <input type="checkbox" className="ch-ignore-on" value="7" />
                    <input type="checkbox" className="ch-ignore-on" value="8" />
                    <input type="checkbox" className="ch-ignore-on" value="9" />
                    <input type="checkbox" className="ch-ignore-on" value="10" />
                    <input type="checkbox" className="ch-ignore-on" value="11" />
                    <input type="checkbox" className="ch-ignore-on" value="12" />
                    <input type="checkbox" className="ch-ignore-on" value="13" />
                    <input type="checkbox" className="ch-ignore-on" value="14" />
                    <input type="checkbox" className="ch-ignore-on" value="15" />
                    <input type="checkbox" className="ch-ignore-on" value="16" />
                    <input type="checkbox" className="ch-ignore-on" value="17" />
                    <input type="checkbox" className="ch-ignore-on" value="18" />
                    <input type="checkbox" className="ch-ignore-on" value="19" />
                    <input type="checkbox" className="ch-ignore-on" value="20" />
                    <input type="checkbox" className="ch-ignore-on" value="21" />
                    <input type="checkbox" className="ch-ignore-on" value="22" />
                    <input type="checkbox" className="ch-ignore-on" value="23" />
                    <input type="checkbox" className="ch-ignore-on" value="24" />
                    <input type="checkbox" className="ch-ignore-on" value="25" />
                    <input type="checkbox" className="ch-ignore-on" value="26" />
                    <input type="checkbox" className="ch-ignore-on" value="27" />
                    <input type="checkbox" className="ch-ignore-on" value="28" />
                </ChWrapper>
                <button
                    onClick={onClickChIgnoreOn}
                >Сделать рабочим</button>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={2} />
            </div>
            <div>
                <ChWrapper>
                    <input type="checkbox" className="ch-ignore-off" value="1" />
                    <input type="checkbox" className="ch-ignore-off" value="2" />
                    <input type="checkbox" className="ch-ignore-off" value="3" />
                    <input type="checkbox" className="ch-ignore-off" value="4" />
                    <input type="checkbox" className="ch-ignore-off" value="5" />
                    <input type="checkbox" className="ch-ignore-off" value="6" />
                    <input type="checkbox" className="ch-ignore-off" value="7" />
                    <input type="checkbox" className="ch-ignore-off" value="8" />
                    <input type="checkbox" className="ch-ignore-off" value="9" />
                    <input type="checkbox" className="ch-ignore-off" value="10" />
                    <input type="checkbox" className="ch-ignore-off" value="11" />
                    <input type="checkbox" className="ch-ignore-off" value="12" />
                    <input type="checkbox" className="ch-ignore-off" value="13" />
                    <input type="checkbox" className="ch-ignore-off" value="14" />
                    <input type="checkbox" className="ch-ignore-off" value="15" />
                    <input type="checkbox" className="ch-ignore-off" value="16" />
                    <input type="checkbox" className="ch-ignore-off" value="17" />
                    <input type="checkbox" className="ch-ignore-off" value="18" />
                    <input type="checkbox" className="ch-ignore-off" value="19" />
                    <input type="checkbox" className="ch-ignore-off" value="20" />
                    <input type="checkbox" className="ch-ignore-off" value="21" />
                    <input type="checkbox" className="ch-ignore-off" value="22" />
                    <input type="checkbox" className="ch-ignore-off" value="23" />
                    <input type="checkbox" className="ch-ignore-off" value="24" />
                    <input type="checkbox" className="ch-ignore-off" value="25" />
                    <input type="checkbox" className="ch-ignore-off" value="26" />
                    <input type="checkbox" className="ch-ignore-off" value="27" />
                    <input type="checkbox" className="ch-ignore-off" value="28" />
                </ChWrapper>
                <button
                    onClick={onClickChIgnoreOff}
                >Сделать выходныс</button>
                <input name='selectignore' className='selectignore' type="radio" id="radioButton" value={3}/>
            </div>
        </div>
        
    )
}
