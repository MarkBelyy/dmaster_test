import React from 'react'

export default function CalendarPattern({ patternDays,
  setPatternDays }) {
  function formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря', ''];
    const daysOfWeek = ['Воскресенья', 'Понедельники', 'Вторники', 'Среды', 'Четверги', 'Пятница', 'Субботы'];

    const year = date.year;
    const month = months[date.month - 1];
    const dayOfWeek = daysOfWeek[date.weekday];

    return `${dayOfWeek} ${month} ${year}го `;
  }

  if (patternDays[0]) return (
    <div>
      <h2>Список паттернов</h2>

      <div>
         <ul>
      {patternDays.map((item, index) => (
        <li key={index}>{JSON.stringify(formatDate(item))}</li>
      ))}
    </ul>
      </div>
      {/* <div>
        <p>{patternDays[0].day}</p>
        <p>{patternDays[0].month}</p>
        <p>{patternDays[0].year}</p>
      </div> */}
    </div>
  )
}
