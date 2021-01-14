import moment from "moment";
import { ITask } from "../types";

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
    return moment(date).set("date", day).toString();
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

  const daysWithTasks = getDaysWithTasks(days);
  const todayDate = parseInt(date.format("D"));

  return { daysWithTasks, todayDate };
}
