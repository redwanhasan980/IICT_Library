import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function OutsideBookLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await api.get('/outside-books?limit=500');
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div className="container">
      <h1>📓 Outside Book Logs</h1>
      <div className="library-card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Registration No.</th>
              <th>Book Title</th>
              <th>Department</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                <td>{log.registrationNumber}</td>
                <td>{log.bookTitle}</td>
                <td>{log.department}</td>
                <td>{log.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <p style={{ textAlign: 'center', padding: '30px', fontStyle: 'italic' }}>No outside book entries yet.</p>}
      </div>
    </div>
  );
}

export default OutsideBookLogs;
