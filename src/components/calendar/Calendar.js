import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Monitor from './Monitor'
import CalendarGrid from './CalendarGrid'
import InputBlock from './InputBlock'
import CalendarPattern from './CalendarPattern'

export default function Calendar() {
  const [isRed, setIsRed] = useState([])
  const [ignoreOnDays, setIgnoreOnDays] = useState([])
  const [ignoreOffDays, setIgnoreOffDays] = useState([])
  const [patternDays, setPatternDays] = useState([])
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
  const ResetMonth = () => {
    setIsRed([])
    //get data
  }

  console.log(`startDay: ${startDay}, tempday: ${tempday}`);
  return (
    <div>
      <h2>Календарь</h2>
      <Monitor
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
        tempday={tempday}
      />
      <CalendarGrid
        startDay={startDay} tempday={tempday}
        isRed={isRed} setIsRed={setIsRed}
        ignoreOnDays={ignoreOnDays}
        setIgnoreOnDays={setIgnoreOnDays}
        ignoreOffDays={ignoreOffDays}
        setIgnoreOffDays={setIgnoreOffDays}
        patternDays={patternDays}
        setPatternDays={setPatternDays}
      />
      <InputBlock
        ResetMonth={ResetMonth}
      />
      <CalendarPattern
        patternDays={patternDays}
        setPatternDays={setPatternDays} />
    </div>
  )
}

