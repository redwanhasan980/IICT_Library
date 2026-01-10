import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function FacultyRecords() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchFacultyRecords();
  }, []);

  const fetchFacultyRecords = async () => {
    try {
      const response = await api.get('/transactions?limit=1000');
      setTransactions(response.data.transactions.filter(t => t.Member?.memberType === 'faculty'));
    } catch (error) {
      console.error('Error fetching faculty records:', error);
    }
  };

  return (
    <div className="container">
      <h1>👩‍🏫 Faculty Borrow Records</h1>
      <div className="library-card">
        <table>
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className={t.status === 'returned' ? 'returned' : ''}>
                <td>{t.Member?.name}</td>
                <td>{t.Member?.membershipId}</td>
                <td>{t.Member?.department}</td>
                <td>{t.Book?.title}</td>
                <td>{new Date(t.issueDate).toLocaleDateString()}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyRecords;
