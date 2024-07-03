import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Base URL for API calls
const API_BASE_URL = 'https://your-api-endpoint.com/api';

// Function to fetch dashboard data
const fetchDashboardData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Header component
const Header = () => (
  <header className="header">
    <div className="logo">Predulive Labs</div>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div className="user-profile">
      <img src="user-avatar.png" alt="User Avatar" />
      <span>John Doe</span>
    </div>
  </header>
);

// Sidebar component
const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Users</a></li>
      <li><a href="#">Notifications</a></li>
    </ul>
    <div className="user-section">
      <h3>User Data</h3>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
    </div>
    <div className="notification-section">
      <h3>Notifications</h3>
      <p>Mails: 3</p>
      <p>Messages: 5</p>
      <p>Feedback: 2</p>
    </div>
  </aside>
);

// Chart component
const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

// Table component
const TableComponent = ({ data }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Graph component
const GraphComponent = ({ data }) => {
  const graphData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.values,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={graphData} />;
};

// Dashboard component
const Dashboard = () => {
  const userId = 'user123';
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    fetchDashboardData(userId).then(setDashboardData);
  }, [userId]);

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <main className="main-content">
        <div className="section-top">
          <div className="chart-section">
            <ChartComponent data={dashboardData.chartData || { labels: [], values: [] }} />
          </div>
          <div className="table-section">
            <TableComponent data={dashboardData.tableData || []} />
          </div>
        </div>
        <div className="section-bottom">
          <GraphComponent data={dashboardData.graphData || { labels: [], values: [] }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Footer component
const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Predulive Labs. All rights reserved.</p>
  </footer>
);

// Main App component
const App = () => (
  <div className="App">
    <Dashboard />
  </div>
);

export default App;
