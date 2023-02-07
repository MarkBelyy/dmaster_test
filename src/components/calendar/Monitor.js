import React from 'react'

export default function Monitor({tempday, prevMonth, nextMonth, goToday}) {
    return (
        <div>
            <button onClick={prevMonth}>Пред</button>
            <button onClick={goToday}>Сегодня</button>
            <button onClick={nextMonth}>След</button>
        </div>
    )
}
