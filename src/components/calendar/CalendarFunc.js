import moment from 'moment'

export const getDaysArray = (start, end) => {
  const days = [];
  let currentDate = moment(start);

  while (currentDate <= end) {
    days.push(moment(currentDate));
    currentDate = moment(currentDate).add(1, 'd');
  }

  return days;
};

export const getPatternDays = (dayweek, daysArray) => {
  const currentMonth = daysArray[20].month();
  return daysArray
    .filter(item => item.day() === dayweek && item.month() === currentMonth)
    .map(x => x.format('DDMMYYYY'));
};

export const getNextPatternDays = (dayweek, daysArray) => {
  const currentMonth = daysArray[20].month();
  return daysArray
    .filter(item => item.day() === dayweek && item.month() === currentMonth + 1)
    .map(x => x.format('DDMMYYYY'));
};

export const getPrevPatternDays = (dayweek, daysArray) => {
  const currentMonth = daysArray[20].month();
  return daysArray
    .filter(item => item.day() === dayweek && item.month() === currentMonth - 1)
    .map(x => x.format('DDMMYYYY'));
};

export const getYearPatternDays = (dayweek, daysArray) => {
  return daysArray
    .filter(item => item.day() === dayweek)
    .map(x => x.format('DDMMYYYY'));
};

export const getIgonoreDays = (firstday, lastday) => {
  const daysArray = getDaysArray(firstday, lastday);
  return daysArray.map(day => day.format('DDMMYYYY'));
};

export const isObjectInArray = (arr, obj) => {
  return arr.some(item => JSON.stringify(item) === JSON.stringify(obj));
};

export const checkObjSinArray = (objsget, oldobjs) => {
  const uobj = objsget.filter(obj => !isObjectInArray(oldobjs, obj));
  return uobj;
};

export const parseDate = (dateObj) => {
  const startDate = moment(`${dateObj.startY}-${dateObj.startM}-${dateObj.startD}`, "YYYY-MM-DD");
  const endDate = moment(`${dateObj.finishY}-${dateObj.finishM}-${dateObj.finishD}`, "YYYY-MM-DD");
  console.log('startDate', startDate.format('DD.MM.YYYY'));
  console.log('startDate', endDate.format('DD.MM.YYYY'));
  return [startDate, endDate];
};