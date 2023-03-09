import React from 'react'

export default function Monitor({ prevMonth, nextMonth, goToday, tempday }) {
    const MonthStatusChange = (event) => {
        const checked = event.target.checked;
        // отправка на сервер значения checked
        console.log(`Month status changed to ${checked}`);
    }
    return (
        <div>
            <h2>{tempday.format('MMMYYYY')}</h2>
            <button onClick={prevMonth}>Пред</button>
            <button onClick={goToday}>Сегодня</button>
            <button onClick={nextMonth}>След</button>
            <input type="checkbox" onClick={MonthStatusChange}/>
        </div>
    )
}
