import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function BorrowersList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    try {
      const response = await api.get('/transactions?limit=1000');
      setTransactions(response.data.transactions.filter(t => t.Member?.memberType === 'student'));
    } catch (error) {
      console.error('Error fetching borrowers:', error);
    }
  };

  return (
    <div className="container">
      <h1>👨‍🎓 Student Borrowers</h1>
      <div className="library-card">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Membership ID</th>
              <th>Book</th>
              <th>Accession No.</th>
              <th>Issue Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className={t.status === 'returned' ? 'returned' : ''}>
                <td>{t.Member?.name}</td>
                <td>{t.Member?.membershipId}</td>
                <td>{t.Book?.title}</td>
                <td>{t.Book?.isbn}</td>
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

export default BorrowersList;
