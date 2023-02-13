import React from 'react'

export default function Monitor({prevMonth, nextMonth, goToday}) {
    return (
        <div>
            <button onClick={prevMonth}>Пред</button>
            <button onClick={goToday}>Сегодня</button>
            <button onClick={nextMonth}>След</button>
        </div>
    )
}
