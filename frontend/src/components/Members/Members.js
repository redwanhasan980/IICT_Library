import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Members({ user }) {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    membershipId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    memberType: 'student',
    department: '',
    expiryDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get('/members?limit=100');
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      membershipId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      memberType: 'student',
      department: '',
      expiryDate: ''
    });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData(member);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/members/${editingId}`, formData);
      } else {
        await api.post('/members', formData);
      }
      setShowModal(false);
      fetchMembers();
    } catch (error) {
      alert('Error saving member: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await api.delete(`/members/${id}`);
        fetchMembers();
      } catch (error) {
        alert('Error deleting member');
      }
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'librarian';

  return (
    <div className="container">
      <h1>Members Management</h1>
      
      {isAdmin && (
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleAdd}>Add New Member</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Membership ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Department</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.membershipId}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.memberType}</td>
              <td>{member.department}</td>
              <td>{member.status}</td>
              {isAdmin && (
                <td>
                  <div className="actions">
                    <button className="btn-sm" onClick={() => handleEdit(member)}>Edit</button>
                    <button className="btn-sm btn-danger" onClick={() => handleDelete(member.id)}>Delete</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Member' : 'Add New Member'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Membership ID"
                value={formData.membershipId}
                onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
                required
              />
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <select
                value={formData.memberType}
                onChange={(e) => setFormData({ ...formData, memberType: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
                <option value="external">External</option>
              </select>
              <input
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={formData.expiryDate ? formData.expiryDate.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
              <button type="submit">{editingId ? 'Update' : 'Add'} Member</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
