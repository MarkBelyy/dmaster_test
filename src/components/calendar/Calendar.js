import React, { useState } from 'react'
import moment from 'moment'
import Monitor from './Monitor'
import CalendarGrid from './CalendarGrid'

export default function Calendar() {
  const [tempday, setTempday] = useState(moment());
  // moment.updateLocale('en', {week: {dow: 1}})

  const startDay = tempday.clone().startOf('month').startOf('week');

 console.log(`startof: ${tempday.startOf('month').startOf('week') }`);

  const prevMonth = () => setTempday(prev => prev.clone().subtract(1, 'month'));
  const nextMonth = () => setTempday(prev => prev.clone().add(1, 'month'));
  const goToday = () => setTempday(moment());

  // console.log(`tempday: ${tempday}`)
  // console.log(`startDay: ${startDay}, tempday: ${tempday}`)
  console.log(`startDay: ${startDay}, tempday: ${tempday}`);
  return (
    <div>
      <Monitor
        tempday={tempday}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <CalendarGrid startDay={startDay} />
    </div>
  )
}
