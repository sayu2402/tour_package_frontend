import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/packages/${id}/`)
      .then(res => setPkg(res.data))
      .catch(err => console.error('Error fetching package detail:', err));
  }, [id]);

  if (!pkg) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">{pkg.title}</h1>

      {/* Package Photos */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        {pkg.photos.map(photo => (
          <img
            key={photo.id}
            src={photo.image}
            alt="Package"
            className="w-[300px] h-[200px] object-cover rounded-lg shadow"
          />
        ))}
      </div>

      <p className="text-lg text-gray-700 mb-2">
        <strong>From:</strong> {pkg.source_city} → {pkg.destination_city}
      </p>

      <p className="text-gray-600 mb-6">{pkg.description}</p>

      {/* Schedules */}
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Schedules</h2>
      {pkg.schedules.length > 0 ? (
        <ul className="space-y-6">
          {pkg.schedules.map(schedule => (
            <li key={schedule.id} className="border p-4 rounded-md shadow-sm bg-white">
              <p className="text-lg font-medium text-gray-800 mb-2">
                {schedule.title}<br />
                <span className="text-sm text-gray-600">
                  {schedule.from_date} to {schedule.to_date} – ₹{schedule.amount}
                </span>
              </p>

              {/* Schedule Photos */}
              <div className="flex gap-3 mb-3">
                {schedule.photos.map(photo => (
                  <img
                    key={photo.id}
                    src={photo.image}
                    alt="Schedule"
                    className="w-[200px] h-[150px] object-cover rounded-md shadow"
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  console.log('Setting schedule ID:', schedule.id);
                  setSelectedScheduleId(schedule.id);
                }}
                className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition"
              >
                Enquire for this schedule
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No schedules available.</p>
      )}

      <hr className="my-10" />
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Enquiry Form</h2>
      {selectedScheduleId ? (
        <p className="text-green-700 mb-4">Selected Schedule ID: {selectedScheduleId}</p>
      ) : (
        <p className="text-gray-500 mb-4">Please select a schedule to enquire.</p>
      )}
      <EnquiryForm scheduleId={selectedScheduleId} />
    </div>
  );
};

export default PackageDetail;
