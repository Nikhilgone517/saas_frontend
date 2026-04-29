import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // The 'useEffect' hook runs automatically when the dashboard loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // --- READ: Fetch user's tasks from backend ---
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://saas-backend-9ddc.onrender.com/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}` // This is our VIP pass!
        }
      });
      const data = await response.json();
      
      if (response.ok) setTasks(data);
      if (response.status === 401) handleLogout(); // If token is expired, log them out
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // --- CREATE: Send new task to backend ---
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://saas-backend-9ddc.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });

      if (response.ok) {
        setTitle(''); // Clear the input
        setDescription(''); // Clear the input
        fetchTasks(); // Refresh the list to show the new task
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // --- UPDATE: Toggle status between Pending and Completed ---
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://saas-backend-9ddc.onrender.com/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchTasks(); // Refresh list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // --- DELETE: Remove task from backend ---
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://saas-backend-9ddc.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchTasks(); // Refresh list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Task Title" 
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <textarea 
              placeholder="Task Description (optional)" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Create one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`p-4 rounded-lg shadow flex justify-between items-center border-l-4 ${task.status === 'Completed' ? 'bg-green-50 border-green-500' : 'bg-white border-yellow-500'}`}>
                <div>
                  <h3 className={`text-lg font-bold ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleToggleStatus(task.id, task.status)}
                    className={`px-3 py-1 rounded text-sm font-medium text-white transition ${task.status === 'Completed' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {task.status === 'Completed' ? 'Undo' : 'Complete'}
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;