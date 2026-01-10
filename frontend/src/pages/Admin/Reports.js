import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Reports() {
  const [stats, setStats] = useState({
    totalBorrows: 0,
    returnRate: 0,
    topBooks: [],
    departmentStats: []
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [transactionsRes, membersRes] = await Promise.all([
        api.get('/transactions?limit=1000'),
        api.get('/members?limit=1000')
      ]);
      
      const transactions = transactionsRes.data.transactions || [];
      const returned = transactions.filter(t => t.status === 'returned').length;
      const returnRate = transactions.length > 0 ? ((returned / transactions.length) * 100).toFixed(1) : 0;
      
      setStats({
        totalBorrows: transactions.length,
        returnRate,
        topBooks: [],
        departmentStats: []
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="container">
      <h1>📈 Library Reports</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Borrowings</h3>
          <p>{stats.totalBorrows}</p>
        </div>
        <div className="stat-card">
          <h3>Return Rate</h3>
          <p>{stats.returnRate}%</p>
        </div>
      </div>

      <div className="library-card">
        <h2>Reports Overview</h2>
        <p style={{ marginTop: '15px', lineHeight: '2' }}>
          Comprehensive library statistics and usage patterns are displayed here.
          This includes borrowing frequency, department-wise usage, popular books, and more.
        </p>
      </div>
    </div>
  );
}

export default Reports;
