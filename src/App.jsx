import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import ElementForm from "./ElementForm";
import "./App.css";

// Predefined elements for drag-and-drop
const elements = [
  { id: "text", content: "Text Element" },
  { id: "image", content: "Image Element" },
  { id: "button", content: "Button Element" },
];

function DraggableElement({ element }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: element.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="draggable-element"
    >
      {element.content}
    </div>
  );
}

function DroppableArea({ droppedElements }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    backgroundColor: isOver ? "#d1e7dd" : "#f8f9fa", // Light green on hover
    minHeight: "300px",
    padding: "10px",
    border: "2px dashed #0d6efd", // Blue dashed border
    borderRadius: "8px",
  };

  return (
    <div ref={setNodeRef} style={style} className="canvas">
      {droppedElements.map((element, index) => (
        <div key={index} className="canvas-element">
          {element.content === "Text Element" && (
            <p>{element.text || "Editable Text"}</p>
          )}
          {element.content === "Image Element" && (
            <img
              src={element.src || "https://via.placeholder.com/100"}
              alt="Placeholder"
            />
          )}
          {element.content === "Button Element" && (
            <button>{element.label || "Click Me"}</button>
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [droppedElements, setDroppedElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleDragEnd = (event) => {
    const { active } = event;
    const element = elements.find((el) => el.id === active.id);
    setDroppedElements([...droppedElements, element]);
  };

  return (
    <div className="App">
      <div className="drag-section">
        <h3>Drag Elements</h3>
        <DndContext onDragEnd={handleDragEnd}>
          {elements.map((element) => (
            <DraggableElement key={element.id} element={element} />
          ))}
        </DndContext>
      </div>

      <div className="canvas-section">
        <h3>Canvas</h3>
        <DroppableArea droppedElements={droppedElements} />
        {selectedElement !== null && (
          <ElementForm
            element={droppedElements[selectedElement]}
            updateElement={(updatedElement) => {
              const newElements = [...droppedElements];
              newElements[selectedElement] = updatedElement;
              setDroppedElements(newElements);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
