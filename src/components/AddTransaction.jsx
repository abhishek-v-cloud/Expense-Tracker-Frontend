import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../api';

const AddTransaction = ({ onSuccess, isEditing, transaction, onCancel }) => {
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const expenseCategories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Bonus', 'Investment', 'Gift', 'Refund', 'Other'];

  useEffect(() => {
    if (isEditing && transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type || 'expense',
        category: transaction.category,
        date: new Date(transaction.date).toISOString().split('T')[0],
        notes: transaction.notes || ''
      });
    }
  }, [isEditing, transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { [name]: value };
    
    // Reset category when type changes
    if (name === 'type') {
      newData.category = value === 'income' ? incomeCategories[0] : expenseCategories[0];
    }
    
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isEditing) {
        await transactionAPI.updateTransaction(transaction._id, formData);
        setSuccess('✅ Transaction updated successfully!');
      } else {
        await transactionAPI.addTransaction(formData);
        setSuccess('✅ Transaction added successfully!');
        setFormData({
          title: '',
          amount: '',
          type: 'expense',
          category: 'Other',
          date: new Date().toISOString().split('T')[0],
          notes: ''
        });
      }
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      setError('❌ ' + (err.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
        {isEditing ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Type Toggle */}
        <div className="form-group">
          <label>💰 Transaction Type</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: expenseCategories[0] }))}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid',
                borderColor: formData.type === 'expense' ? '#f44336' : '#e0e6ed',
                borderRadius: '8px',
                background: formData.type === 'expense' ? '#ffebee' : 'white',
                color: formData.type === 'expense' ? '#f44336' : '#2c3e50',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📉 Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: incomeCategories[0] }))}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid',
                borderColor: formData.type === 'income' ? '#4caf50' : '#e0e6ed',
                borderRadius: '8px',
                background: formData.type === 'income' ? '#e8f5e9' : 'white',
                color: formData.type === 'income' ? '#4caf50' : '#2c3e50',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📈 Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>📝 Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={formData.type === 'income' ? 'e.g., Monthly salary' : 'e.g., Grocery shopping'}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>💵 Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>🏷️ Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>📅 Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>📄 Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes about this transaction..."
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? '⏳ Saving...' : (isEditing ? '💾 Update' : '➕ Add')} Transaction
          </button>
          {isEditing && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
              style={{ flex: 1 }}
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
