import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import logo from "./logo.svg";
import "./App.css";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "item1",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "item2",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "item3",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [items, setItems] = React.useState(DATA);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) {
      console.log(" destination is null");
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("source and  destination is equal");
      return;
    }

    if (type == "group") {
      const reordereditems = [...items];

      //['item1', 'item2', 'item3']
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedItem] = reordereditems.splice(sourceIndex, 1);
      reordereditems.splice(destinationIndex, 0, removedItem);

      return setItems(reordereditems);
    }
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>List</h1>
          </div>
          <Droppable droppableId="list" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    key={store.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <h3>{store.name}</h3>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
