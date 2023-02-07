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
`

export default function InputBlock({ onClickChPattern, onClickChIgnoreOn }) {
    return (
        <div>
            <div className="pattern-checkboxes">
                <input type="checkbox" className="ch-pattern" value="1" />
                <input type="checkbox" className="ch-pattern" value="2" />
                <input type="checkbox" className="ch-pattern" value="3" />
                <input type="checkbox" className="ch-pattern" value="4" />
                <input type="checkbox" className="ch-pattern" value="5" />
                <input type="checkbox" className="ch-pattern" value="6" />
                <input type="checkbox" className="ch-pattern" value="0" />
                <button
                    onClick={onClickChPattern}
                >pattern</button>
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
                    >on</button>
            </div>
        </div>
    )
}
