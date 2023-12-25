import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";
import LiveChat from "./pages/livechat";
import FakeLogin from "./pages/fakelogin";
import Faketicket from "./pages/faketicket";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/chat" element={<LiveChat />} />
            </Routes>
        </>
    );
  }
  
  export default App;
