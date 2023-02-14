import React from 'react'

export default function CalendarPattern({ patternDays,
  setPatternDays }) {

  if (patternDays[0]) return (
    <div>
      <h2>Список паттернов</h2>

      {/* <div>
        patternDays.map((x) => 
        (
        <div>
          {x.day}
        </div>
        ))
      </div> */}
      <div>
        <p>{patternDays[0].day}</p>
        <p>{patternDays[0].month}</p>
        <p>{patternDays[0].year}</p>
      </div>
    </div>
  )
}
