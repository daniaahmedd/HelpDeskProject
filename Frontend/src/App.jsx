import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Knowldgebasess from "./pages/knowldgebases";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/FAQ" element={<Knowldgebasess/>} />
                <Route path="/login" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </>
    );
  }
  
  export default App;
