function TaskList({ tasks, onTaskClick }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-neutral-500">No tasks found.</p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={task._id || index}
            className="bg-white p-4 mb-3 rounded-xl border border-neutral-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-green-500"
            onClick={() => onTaskClick(task)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-neutral-900 text-base">
                  {task.title}
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  {task.description.length > 40
                    ? task.description.slice(0, 40) + "..."
                    : task.description}
                </p>
              </div>
              <p className="text-sm text-gray-400 ml-4 whitespace-nowrap">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
