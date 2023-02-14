import React from 'react'

export default function Monitor({ prevMonth, nextMonth, goToday, tempday }) {
    return (
        <div>
            <h2>{tempday.format('MMMYYYY')}</h2>
            <button onClick={prevMonth}>Пред</button>
            <button onClick={goToday}>Сегодня</button>
            <button onClick={nextMonth}>След</button>
        </div>
    )
}
