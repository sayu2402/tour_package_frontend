import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/packages/${id}/`)
      .then(res => setPkg(res.data))
      .catch(err => console.error('Error fetching package detail:', err));
  }, [id]);

  if (!pkg) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{pkg.title}</h1>

      {/* Image gallery for package photos */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px' }}>
        {pkg.photos.map(photo => (
          <img
            key={photo.id}
            src={photo.image}
            alt="Package"
            style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
          />
        ))}
      </div>

      <p><strong>From:</strong> {pkg.source_city} → {pkg.destination_city}</p>
      <p>{pkg.description}</p>

      <h2>Schedules</h2>
      {pkg.schedules.length > 0 ? (
        <ul>
          {pkg.schedules.map(schedule => (
            <li key={schedule.id} style={{ marginBottom: '20px' }}>
              <p>
                <strong>{schedule.title}</strong><br />
                {schedule.from_date} to {schedule.to_date} – ₹{schedule.amount}
              </p>

              {/* Schedule photos */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                {schedule.photos.map(photo => (
                  <img
                    key={photo.id}
                    src={photo.image}
                    alt="Schedule"
                    style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                ))}
              </div>

              <button onClick={() => setSelectedSchedule(schedule.id)}>Enquire for this schedule</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules available for this package.</p>
      )}

      <hr />
      <h2>Enquiry Form</h2>
      <EnquiryForm scheduleId={selectedSchedule} />
    </div>
  );
};

export default PackageDetail;
