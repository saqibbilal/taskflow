import { Task } from "@/types/task";
import { addTask } from "./actions"; // Import the action

export default async function Home() {
  // We fetch from the Herd URL or localhost
  // Note: Next.js 15 uses 'fetch' which is cached by default.
  // 'no-store' ensures we see our Laravel changes immediately.
  const response = await fetch("http://backend.test/api/tasks", {
      cache: 'no-store'
  });

  const tasks: Task[] = await response.json();

  return (
      <main className="p-10 font-sans">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">TaskFlow</h1>

          <div className="bg-white shadow rounded-lg divide-y">

              <form action={addTask} className="mb-8 flex gap-2">
                  <input
                      type="text"
                      name="title"
                      placeholder="New task..."
                      className="border p-2 rounded w-full"
                      required
                  />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add
                  </button>
              </form>

            {tasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center justify-between">
              <span className={task.is_completed ? "line-through text-gray-400" : "text-slate-700"}>
                {task.title}
              </span>
                  <span className="text-sm px-2 py-1 rounded bg-slate-100">
                {task.is_completed ? "Done" : "Pending"}
              </span>
                </div>
            ))}
          </div>
        </div>
      </main>
  );
}