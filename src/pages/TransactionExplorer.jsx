import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../api';
import AddTransaction from '../components/AddTransaction';

const TransactionExplorer = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await transactionAPI.getTransactions(filters);
      setTransactions(response.data.transactions);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filter changes
    }));
  };

  const handleDeleteTransaction = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      await transactionAPI.deleteTransaction(id);
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditing(true);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  if (isEditing) {
    return (
      <>
        <AddTransaction 
          onSuccess={handleEditSuccess}
          isEditing={true}
          transaction={editingTransaction}
          onCancel={() => {
            setIsEditing(false);
            setEditingTransaction(null);
          }}
        />
        <div className="container">
          <button 
            onClick={() => {
              setIsEditing(false);
              setEditingTransaction(null);
            }}
            className="btn btn-secondary"
            style={{ marginBottom: '20px' }}
          >
            ← Back to Explorer
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <h2>🔍 Transaction Explorer</h2>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Filters */}
      <div className="filters">
        <h3>🔎 Filter & Search</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search title or notes..."
            />
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="income">💚 Income</option>
              <option value="expense">📉 Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="">--- Expenses ---</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option value="">--- Income ---</option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Bonus</option>
              <option>Investment</option>
              <option>Gift</option>
              <option>Refund</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="date">Date (Newest)</option>
              <option value="amount">Amount (Highest)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Items per page</label>
            <select
              name="limit"
              value={filters.limit}
              onChange={handleFilterChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="loading">💫 Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="empty-state">
          <h2>No transactions found</h2>
          <p>Try adjusting your filters or create a new transaction.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px', color: '#7f8c8d', fontSize: '14px' }}>
            <strong>📊 Showing {transactions.length} of {pagination.totalItems} transactions</strong>
            {pagination.totalPages > 1 && (
              <span style={{ marginLeft: '10px', color: '#2196f3' }}>
                (Page {pagination.currentPage} of {pagination.totalPages})
              </span>
            )}
          </div>
          <div className="transactions-container">
            {transactions.map(transaction => (
              <div key={transaction._id} className="transaction-card">
                <div className="transaction-info">
                  <div className="transaction-title">{transaction.title}</div>
                  <div className="transaction-details">
                    <span style={{ display: 'inline-block', marginRight: '10px' }}>
                      {transaction.type === 'income' ? '💚 Income' : '📉 Expense'}
                    </span>
                    • {transaction.category} • {formatDate(transaction.date)}
                  </div>
                  {transaction.notes && (
                    <div className="transaction-details" style={{ fontStyle: 'italic', color: '#bbb', marginTop: '6px' }}>
                      "{transaction.notes}"
                    </div>
                  )}
                  <div className="transaction-amount" style={{ color: transaction.type === 'income' ? '#4caf50' : '#f44336' }}>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                  </div>
                </div>
                <div className="transaction-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEditTransaction(transaction)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteTransaction(transaction._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.currentPage === 1}
              >
                ← Previous
              </button>

              {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 7) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 4) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 3) {
                  pageNum = pagination.totalPages - 6 + i;
                } else {
                  pageNum = pagination.currentPage - 3 + i;
                }

                if (pageNum < 1 || pageNum > pagination.totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    className={pagination.currentPage === pageNum ? 'active' : ''}
                    onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.currentPage >= pagination.totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionExplorer;
