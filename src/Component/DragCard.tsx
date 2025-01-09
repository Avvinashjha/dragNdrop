import React from "react";
import "./style.css";

interface Task {
  id: number;
  title: string;
  priority: number;
  position: number;
  status: string;
}

interface CardProps {
  task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
  /**
   * Handle drag-start event
   */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id.toString()); // Attach the `task.id` to the data transfer object
  };

  return (
    <div
      className="card__container"
      draggable
      onDragStart={handleDragStart} // Allow the card to be draggable
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
      }}
    >
      <h4>{task.title}</h4>
      <p>Priority: {task.priority}</p>
      <p>Position: {task.position}</p>
    </div>
  );
};

export default Card;
