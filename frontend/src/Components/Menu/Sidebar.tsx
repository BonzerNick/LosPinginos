import React from "react";

interface Task {
  id: number;
  title: string;
  //   description: string;
}

interface SidebarProps {
  tasks: Task[];
}

const Sidebar: React.FC<SidebarProps> = ({ tasks }) => {
  return (
    <div className="bg-gray-200 w-1/4 p-4 h-screen">
      <h2 className="text-xl font-bold mb-5 border-b-8 border-black">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <h3 className="text-lg font-semibold border-2 border-black">
              {task.title}
            </h3>
            {/* <p className="text-sm">{task.description}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
