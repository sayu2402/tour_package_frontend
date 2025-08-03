import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/enquiries/');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Enquiries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Email</th>
              <th className="text-left px-4 py-2 border">Phone</th>
              <th className="text-left px-4 py-2 border">Message</th>
              <th className="text-left px-4 py-2 border">Related Schedule</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border-t">
                <td className="px-4 py-2">{enquiry.name}</td>
                <td className="px-4 py-2">{enquiry.email}</td>
                <td className="px-4 py-2">{enquiry.phone}</td>
                <td className="px-4 py-2">{enquiry.message}</td>
                <td className="px-4 py-2">
                  {enquiry.related_schedule_title || 'General'}
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryList;
