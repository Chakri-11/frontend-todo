import React from "react";

function Todoitem({
  title,
  description,
}) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 my-4">
      <div className="border border-gray-300 rounded-xl p-4 shadow-lg">
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="mt-2 flex items-center">
        </div>
      </div>
    </div>
  );
}

export default Todoitem;