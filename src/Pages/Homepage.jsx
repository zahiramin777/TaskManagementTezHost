import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';

const Homepage = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/getalltask');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false); // Update loading state when fetch is completed
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTasks = tasks.filter(task =>
        task.tasktitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen flex-1 p-7">
            <div className="max-w-full">
                <div className="bg-dark-purple text-white py-4 px-6 rounded-t-lg">
                    <h1 className="text-3xl font-bold">Task List</h1>
                    <input type="text" placeholder="Search by Task Title, Description, or Username"
                        className="text-black mt-2 px-4 py-2 w-[300px] rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={searchQuery}
                        onChange={handleSearchChange} />
                </div>

                {loading ? ( 
                    <Spinner size="lg" color="white" mt={4} ml={"500px"} className='mx-auto' />
                ) : (
                    <div className="mt-4 space-y-4">
                        {filteredTasks.map((task, index) => (
                            <div key={index} className="bg-black shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-white">{task.tasktitle}</h2>
                                <p className="text-white">{task.description}</p>
                                <div className="mt-2">
                                    <span className="text-white">Completed by:</span>
                                    <ul className="list-inside mt-1">
                                        <li className="text-gray-500">{task.username}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
