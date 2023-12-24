import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import WorkFlowPage from "./pages/WorkFlowPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
            </Routes>
        </>
    );
  }
  
  export default App;
