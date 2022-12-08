/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "study for the exam",
      dueDate: today,
      completed: true,
    });
  });

  test("Add a task", () => {
    let PreviousLength = all.length;
    add({
      title: "play videogame",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(PreviousLength + 1);
  });

  test("Mark the task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("For Overdue tasks", () => {
    const MyOverDueItems = overdue();
    var Old_Date = new Date();
    Old_Date.setDate(Old_Date.getDate() - 1);
    let yesterday = Old_Date.toLocaleDateString("en-CA");
    add({
      title: "watch a movie",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(MyOverDueItems.length + 1);
  });

  test("For Due today tasks", () => {
    const MyTodayItems = dueToday();
    add({
      title: "update my windows",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(MyTodayItems.length + 1);
  });

  test("For Due later tasks", () => {
    const MyDueLaterItems = dueLater();
    var Upcoming_date = new Date();
    Upcoming_date.setDate(Upcoming_date.getDate() + 1);
    let tomorrow = Upcoming_date.toLocaleDateString("en-CA");
    add({
      title: "Pay all bills",
      dueDate: tomorrow,
      completed: false,
    });
    expect(dueLater().length).toBe(MyDueLaterItems.length + 1);
  });
});
