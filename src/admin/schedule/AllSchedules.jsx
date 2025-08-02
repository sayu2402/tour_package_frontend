import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/schedules/')
      .then(res => setSchedules(res.data))
      .catch(err => console.error('Failed to load schedules', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">📅 All Tour Schedules</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {schedules.map(schedule => (
          <div key={schedule.id} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">{schedule.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Package: <strong>{schedule.package_title}</strong>
            </p>
            <p><strong>Dates:</strong> {schedule.from_date} to {schedule.to_date}</p>
            <p><strong>Amount:</strong> ₹{schedule.amount}</p>
            <p className="text-gray-700 mt-2">{schedule.description}</p>

            <div className="flex gap-3 mt-3 overflow-x-auto">
              {schedule.photos.map(photo => (
                <img
                  key={photo.id}
                  src={photo.image}
                  alt="Schedule"
                  className="w-40 h-28 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSchedules;
