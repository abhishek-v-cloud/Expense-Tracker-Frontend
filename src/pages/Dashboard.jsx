import React, { useEffect, useState } from 'react';
import { transactionAPI } from '../api';
import AddTransaction from '../components/AddTransaction';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await transactionAPI.getDashboard();
      setDashboard(response.data?.dashboard || response);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return `₹${(amount || 0).toFixed(2)}`;
  };

  if (loading) return <div className="container">⏳ Loading dashboard...</div>;
  if (error) return <div className="container alert alert-error">{error}</div>;
  if (!dashboard) return <div className="container alert alert-error">No data available</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>📊 Dashboard</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✕ Cancel' : '➕ Add Transaction'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
          <AddTransaction 
            onSuccess={() => {
              setShowAddForm(false);
              fetchDashboard();
            }} 
          />
        </div>
      )}

      {/* Financial Overview - All Time */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#555' }}>📈 All-Time Overview</h2>
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div className="card" style={{ borderLeft: '4px solid #4caf50' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Income</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>
              {formatAmount(dashboard.totalIncome)}
            </div>
          </div>
          <div className="card" style={{ borderLeft: '4px solid #f44336' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Expenses</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>
              {formatAmount(dashboard.totalExpenses)}
            </div>
          </div>
          <div className="card" style={{ borderLeft: `4px solid ${(dashboard.netBalance || 0) >= 0 ? '#2196f3' : '#ff9800'}` }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Net Balance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: (dashboard.netBalance || 0) >= 0 ? '#2196f3' : '#ff9800' }}>
              {formatAmount(dashboard.netBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* This Month Summary */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#555' }}>📅 This Month</h2>
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div className="card" style={{ borderLeft: '4px solid #4caf50' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Income</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>
              {formatAmount(dashboard.monthIncome)}
            </div>
          </div>
          <div className="card" style={{ borderLeft: '4px solid #f44336' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Expenses</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>
              {formatAmount(dashboard.monthExpenses)}
            </div>
          </div>
          <div className="card" style={{ borderLeft: `4px solid ${(dashboard.monthNet || 0) >= 0 ? '#2196f3' : '#ff9800'}` }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Net</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: (dashboard.monthNet || 0) >= 0 ? '#2196f3' : '#ff9800' }}>
              {formatAmount(dashboard.monthNet)}
            </div>
          </div>
        </div>
      </div>

      {/* Income Breakdown */}
      {dashboard.incomeBreakdown && dashboard.incomeBreakdown.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#555' }}>💚 Income Breakdown (This Month)</h2>
          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dashboard.incomeBreakdown.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    💰 {item._id}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#4caf50' }}>
                    {formatAmount(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expense Breakdown */}
      {dashboard.categoryBreakdown && dashboard.categoryBreakdown.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#555' }}>📊 Expense Breakdown (This Month)</h2>
          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dashboard.categoryBreakdown.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    🏷️ {item._id}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f44336' }}>
                    {formatAmount(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      {dashboard.recentTransactions && dashboard.recentTransactions.length > 0 && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#555' }}>🔄 Recent Transactions</h2>
          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dashboard.recentTransactions.map(txn => (
                <div key={txn._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                      {txn.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(txn.date).toLocaleDateString()} • {txn.category}
                    </div>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: txn.type === 'income' ? '#4caf50' : '#f44336' }}>
                    {txn.type === 'income' ? '+' : '-'}{formatAmount(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
