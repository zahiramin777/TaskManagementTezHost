import React, { useState } from 'react';
import useShowToast from '../Hooks/useShowToast';
function AddTask() {
    const [name, setName] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const showToast=useShowToast();

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (name.trim() === '' || taskTitle.trim() === '' || taskDescription.trim() === '') {
            alert('Please fill out all fields');
            return;
        }

        const newTask = {
            username: name,
            tasktitle: taskTitle,
            description: taskDescription
        };
        try {
            const response = await fetch('/api/addtask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }


        setTasks([...tasks, newTask]);

        // Reset form fields
        setName('');
        setTaskTitle('');
        setTaskDescription('');
    }      catch (error) {
        console.error('Error:', error.message);
        alert('Failed to add task');
    }
}

    const removeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    return (
        <>
        <div className="max-w-full mx-auto my-auto h-[600px] flex-1 p-7 bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
            <div className="md:flex">
                <div className="w-full">
                    <form className="space-y-4 p-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
                            <input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
                            <textarea id="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} rows="3" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-gray-200 p-4">
                <h2 className="text-lg font-semibold mb-2">Task List</h2>
                <ul className="divide-y divide-gray-300">
                    {tasks.map((task, index) => (
                        <li key={index} className="py-2">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-medium">{task.title}</h3>
                                    <p className="text-gray-500">{task.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Completed by: {task.username}</p>
                                    <button onClick={() => removeTask(index)} className="ml-2 text-sm font-medium text-red-500 focus:outline-none">Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
                            </>
    );
    
}
export default AddTask;
