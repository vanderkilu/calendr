import moment from "moment";

export const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const generateMonthDays = (date: moment.Moment) => {
  const firstDayOfMonth = (): number => {
    const day = moment(date).startOf("month").format("d");
    return parseInt(day);
  };
  const daysInMonth = (): number[] => {
    const daysCount = moment(date).daysInMonth();
    return Array.from(Array(daysCount), (_, i) => i + 1);
  };
  const dayStart = firstDayOfMonth();
  const days = [...Array<number>(dayStart).fill(0), ...daysInMonth()];
  const dayDate = (day: number) => {
    return moment(date).set("date", day).toString();
  };
  const currentDay = parseInt(date.format("D"));
  const currentMonth = moment().format("MMM");
  return { days, dayDate, currentDay, currentMonth };
};
