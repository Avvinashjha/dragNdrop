import React, { useState } from "react";
import DragContainer from "./DragContainer";
import "./style.css";

interface Task {
  id: number;
  title: string;
  priority: number;
  position: number;
  status: string;
}

const DragDrop: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", priority: 1, position: 1, status: "TODO" },
    { id: 2, title: "Task 2", priority: 2, position: 2, status: "TODO" },
    { id: 3, title: "Task 3", priority: 3, position: 3, status: "REVIEW" },
    { id: 4, title: "Task 4", priority: 4, position: 4, status: "DONE" },
  ]);

  /**
   * Handle moving a task between DragContainers
   */
  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  /**
   * Handle adding a new task
   */
  const handleTaskAdd = (newTask: Task, status: string) => {
    setTasks([...tasks, { ...newTask, status }]); // Add the new task with the correct status
  };

  const todoTasks = tasks.filter((task) => task.status === "TODO");
  const reviewTasks = tasks.filter((task) => task.status === "REVIEW");
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <div className="dragDrop__container">
      <div className="dragDrop__container__body">
        <DragContainer
          title="TODO"
          tasks={todoTasks}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskAdd={handleTaskAdd}
        />
        <DragContainer
          title="REVIEW"
          tasks={reviewTasks}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskAdd={handleTaskAdd}
        />
        <DragContainer
          title="DONE"
          tasks={doneTasks}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskAdd={handleTaskAdd}
        />
      </div>
    </div>
  );
};

export default DragDrop;
