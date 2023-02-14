import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Monitor from './Monitor'
import CalendarGrid from './CalendarGrid'

export default function Calendar() {
  moment.updateLocale("ru", {
    week: {
      dow: 1, // First day of week is Monday
      doy: 7  // First week of year must contain 1 January (7 + 1 - 1)
    }
  });
  console.log(moment.locales())
  const [tempday, setTempday] = useState(moment());
  useEffect(() => {
    setTempday(moment())
  }, [])


  const startDay = tempday.clone().startOf('month').startOf('week').subtract(1, 'd');



  console.log(`До изменений startDay: ${startDay}, tempday: ${tempday}`);
  
  const prevMonth = () => {
    setTempday(tempday.subtract(1, 'month').clone())
  };
  const nextMonth = () => setTempday(tempday.add(1, 'month').clone());
  const goToday = () => setTempday(moment());

  console.log(`startDay: ${startDay}, tempday: ${tempday}`);
  return (
    <div>
      <h2>Календарь</h2>
      <Monitor
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <CalendarGrid startDay={startDay} tempday={tempday} />
    </div>
  )
}

