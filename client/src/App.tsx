import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashBoard from "../src/pages/dashboard/Dashboard.tsx";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
// import { dark } from "@clerk/themes";
import Home from "../src/pages/home/home.tsx";

function App() {
  return (
    <Router> 
      <FinancialRecordsProvider>
      <div className="app-container">
        <div className="navbar">
          
          <Link to="/home"> <Home/></Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
             
                <DashBoard />
               
              
            }
          />
       
        </Routes>
      </div>
    </FinancialRecordsProvider></Router>
  );
}

export default App;