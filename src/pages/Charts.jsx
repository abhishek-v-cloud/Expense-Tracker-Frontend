import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { transactionAPI } from '../api';

const Charts = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [incomeVsExpenseData, setIncomeVsExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140'];

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true);
    setError('');
    try {
      // Get all transactions to create monthly trend
      const transResponse = await transactionAPI.getTransactions({ limit: 1000 });
      const transactions = transResponse.data.transactions;

      // Get dashboard data
      const dashResponse = await transactionAPI.getDashboard();
      setDashboardData(dashResponse.data?.dashboard || dashResponse);

      // Calculate monthly data for trend chart (both income and expense)
      const monthlyMap = {};
      transactions.forEach(trans => {
        const date = new Date(trans.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyMap[monthKey]) {
          monthlyMap[monthKey] = { month: monthKey, income: 0, expense: 0 };
        }
        
        if (trans.type === 'income') {
          monthlyMap[monthKey].income += trans.amount;
        } else {
          monthlyMap[monthKey].expense += trans.amount;
        }
      });

      const sortedMonths = Object.keys(monthlyMap).sort();
      const monthlyChartData = sortedMonths.map(month => monthlyMap[month]);
      setMonthlyData(monthlyChartData);

      // Income vs Expense summary
      setIncomeVsExpenseData([
        { name: 'Income', value: dashResponse.data?.dashboard?.totalIncome || dashResponse.totalIncome || 0 },
        { name: 'Expenses', value: dashResponse.data?.dashboard?.totalExpenses || dashResponse.totalExpenses || 0 }
      ]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load chart data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">📊 Loading analytics...</div>;
  }

  if (error) {
    return <div className="container alert alert-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="container alert alert-error">No data available</div>;
  }

  return (
    <div className="container">
      <h1>📈 Financial Analytics</h1>

      <div style={{ display: 'grid', gap: '30px', marginTop: '30px' }}>
        {/* Income vs Expense Overview */}
        <div className="chart-card">
          <h3>💰 Income vs Expenses (All Time)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeVsExpenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#4caf50" />
                <Cell fill="#f44336" />
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend - Income vs Expense */}
        {monthlyData.length > 0 && (
          <div className="chart-card">
            <h3>📅 Monthly Income vs Expenses Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4caf50"
                  strokeWidth={2}
                  dot={{ fill: '#4caf50', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#f44336"
                  strokeWidth={2}
                  dot={{ fill: '#f44336', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Expense Category Pie Chart */}
        {dashboardData.categoryBreakdown && dashboardData.categoryBreakdown.length > 0 && (
          <div className="chart-card">
            <h3>🥧 Expense Distribution by Category (This Month)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.categoryBreakdown}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {dashboardData.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Distribution Pie Chart */}
        {dashboardData.incomeBreakdown && dashboardData.incomeBreakdown.length > 0 && (
          <div className="chart-card">
            <h3>🎯 Income Distribution by Source (This Month)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.incomeBreakdown}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {dashboardData.incomeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9', '#e8f5e9'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Expense Category Bar Chart */}
        {dashboardData.categoryBreakdown && dashboardData.categoryBreakdown.length > 0 && (
          <div className="chart-card">
            <h3>📊 Expense Amount by Category (Bar Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dashboardData.categoryBreakdown}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Bar dataKey="total" fill="#f44336" radius={[8, 8, 0, 0]} name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Category Bar Chart */}
        {dashboardData.incomeBreakdown && dashboardData.incomeBreakdown.length > 0 && (
          <div className="chart-card">
            <h3>💚 Income Amount by Source (Bar Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dashboardData.incomeBreakdown}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Bar dataKey="total" fill="#4caf50" radius={[8, 8, 0, 0]} name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Summary Stats */}
        <div className="chart-card">
          <h3>📊 Financial Summary</h3>
          <div className="stats-grid">
            <div className="stat-box" style={{ borderTop: '3px solid #4caf50' }}>
              <div className="stat-label">💚 Total Income</div>
              <div className="stat-value" style={{ color: '#4caf50' }}>
                ₹{(dashboardData.totalIncome || 0).toFixed(2)}
              </div>
            </div>
            <div className="stat-box" style={{ borderTop: '3px solid #f44336' }}>
              <div className="stat-label">📉 Total Expenses</div>
              <div className="stat-value" style={{ color: '#f44336' }}>
                ₹{(dashboardData.totalExpenses || 0).toFixed(2)}
              </div>
            </div>
            <div className="stat-box" style={{ borderTop: `3px solid ${(dashboardData.netBalance || 0) >= 0 ? '#2196f3' : '#ff9800'}` }}>
              <div className="stat-label">💰 Net Balance</div>
              <div className="stat-value" style={{ color: (dashboardData.netBalance || 0) >= 0 ? '#2196f3' : '#ff9800' }}>
                ₹{(dashboardData.netBalance || 0).toFixed(2)}
              </div>
            </div>
            <div className="stat-box" style={{ borderTop: '3px solid #667eea' }}>
              <div className="stat-label">📊 Expense Categories</div>
              <div className="stat-value">
                {dashboardData.categoryBreakdown?.length || 0}
              </div>
            </div>
            <div className="stat-box" style={{ borderTop: '3px solid #4caf50' }}>
              <div className="stat-label">📊 Income Sources</div>
              <div className="stat-value">
                {dashboardData.incomeBreakdown?.length || 0}
              </div>
            </div>
            <div className="stat-box" style={{ borderTop: '3px solid #ff9800' }}>
              <div className="stat-label">📅 This Month Net</div>
              <div className="stat-value" style={{ color: '#ff9800' }}>
                ₹{(dashboardData.monthNet || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
