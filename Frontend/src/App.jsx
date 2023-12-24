import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </>
    );
  }
  
  export default App;
