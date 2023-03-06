import React from 'react'

export default function Day({selectedDay}) {
  if(selectedDay) {
    return (
    <div>
      <h2>Расписание на {selectedDay}</h2>
    </div>
  )
}
}
