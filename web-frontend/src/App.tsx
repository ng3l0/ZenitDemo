import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import InboxPage from './pages/InboxPage';
import HealthReportPage from './pages/ProfilePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/health-report" element={<HealthReportPage />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
