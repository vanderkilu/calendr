import moment from "moment";
import { ITask } from "../types";
import { generateMonthDays } from "../utils";

export default function (date: moment.Moment, tasks: ITask[]) {
  const firstDayOfMonth = (): number => {
    const day = moment(date).startOf("month").format("d");
    return parseInt(day);
  };

  const daysInMonth = () => {
    const daysCount = moment(date).daysInMonth();
    return Array.from(Array(daysCount), (_, i) => i + 1);
  };

  const dayStart = firstDayOfMonth();
  const days = [...Array<number>(dayStart).fill(0), ...daysInMonth()];
  const dayDate = (day: number) => {
    return moment(date).set("date", day).format("YYYY-MM-DD");
  };

  const getDaysWithTasks = (days: number[]) =>
    days.map((day) => {
      const dateStr = dayDate(day);
      const cellTasks = tasks.filter((task) => task.dueDate === dateStr);
      return {
        day: day,
        passed: day === 0,
        tasks: cellTasks,
        dateStr,
      };
    });

  const monthString = (index: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "Decemeber",
    ];
    return months[index];
  };

  const generateDates = () => {
    let oldDate = date;
    return Array.from(Array(11).keys()).map((index) => {
      //set the date to reflect next month and then
      // generate all days for the month
      const newDate = moment(oldDate).set("month", index);
      const { days, dayDate, currentDay, currentMonth } = generateMonthDays(
        newDate
      );
      oldDate = newDate;

      return {
        month: monthString(index),
        days,
        dayDate,
        currentDay,
        currentMonth,
      };
    });
  };

  const daysWithTasks = getDaysWithTasks(days);
  const todayDate = parseInt(date.format("D"));

  return { daysWithTasks, todayDate, generateDates };
}
