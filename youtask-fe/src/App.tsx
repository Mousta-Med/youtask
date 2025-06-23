import "./App.css";
import NavBar from "./components/NavBar";
import TaskManagerPage from "./pages/TaskManagerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<TaskManagerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
