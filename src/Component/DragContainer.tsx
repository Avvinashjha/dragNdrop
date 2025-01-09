import React, { useState } from "react";
import Card from "./DragCard";
import "./style.css";

interface Task {
  id: number;
  title: string;
  priority: number;
  position: number;
  status: string;
}

interface DragContainerProps {
  title: string; // The title of the container (e.g., TODO, REVIEW, DONE)
  tasks: Task[]; // Tasks assigned to this container
  onTaskStatusChange: (taskId: number, newStatus: string) => void; // Callback to change task status on drop
  onTaskAdd: (newTask: Task, status: string) => void; // Callback to add new tasks
}

const DragContainer: React.FC<DragContainerProps> = ({
  title,
  tasks,
  onTaskStatusChange,
  onTaskAdd,
}) => {
  const [editable, setEditable] = useState(false); // To toggle the input field
  const [newTaskValue, setNewTaskValue] = useState(""); // State for the new task input field

  /**
   * Handle adding a new task to this container
   */
  const handleAddTask = () => {
    if (newTaskValue.trim()) {
      const newTask = {
        id: Date.now(), // Use a timestamp as a unique ID
        title: newTaskValue,
        priority: tasks.length + 1,
        position: tasks.length + 1,
        status: title,
      };
      onTaskAdd(newTask, title); // Trigger the callback to add the new task
      setNewTaskValue(""); // Clear the input field
      setEditable(false); // Hide the input field
    }
  };

  /**
   * Handle when a card is dropped into this container
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId")); // Retrieve the `taskId` from `dataTransfer`
    onTaskStatusChange(taskId, title); // Update the `status` of the task
  };

  /**
   * Allow drag-over event for this container
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior to allow dropping
  };

  return (
    <div
      className="drag__container"
      onDragOver={handleDragOver} // Allow drag-over
      onDrop={handleDrop} // Handle drop event
    >
      <div className="drag__container__title">{title}</div>

      <div className="drag__container__content">
        {/* Render tasks */}
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}

        {/* Input field for adding tasks */}
        {editable && (
          <div>
            <input
              type="text"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              placeholder="Enter task title..."
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()} // Add task on pressing Enter
              className="add__task__input"
            />
            <button onClick={handleAddTask} className="add__task__btn">
              Add
            </button>
            <button onClick={() => setEditable(false)} className="cancel__btn">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* "Add New Task" button */}
      {!editable && (
        <button
          className="add__task__toggle"
          onClick={() => setEditable(true)} // Show input field on button click
        >
          + Add New Task
        </button>
      )}
    </div>
  );
};

export default DragContainer;