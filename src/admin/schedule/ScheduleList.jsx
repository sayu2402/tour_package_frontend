import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/schedules/')
      .then(res => setSchedules(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schedules</h1>
        <Link to="/admin/schedule/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Schedule</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Package</th>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id} className="text-center border-t">
              <td className="py-2">{schedule.title}</td>
              <td className="py-2">{schedule.package_title}</td>
              <td className="py-2">{schedule.from_date}</td>
              <td className="py-2">{schedule.to_date}</td>
              <td className="py-2">₹{schedule.amount}</td>
              <td className="py-2">
                <Link to={`/admin/schedule/edit/${schedule.id}`} className="text-blue-500">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;