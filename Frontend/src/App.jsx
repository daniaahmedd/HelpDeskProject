import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import LiveChat from "./pages/livechat";
import Report from "./components/report";
import Reportchart from "./components/reportcharts";
import Getreports from "./components/view-reports";
import TicketHome from "./pages/TicketHome";
import Ticket from "./pages/Ticket";
import UpdateTicket from "./pages/UpdateTicket";
import RateTicket from "./pages/RateTicket";
import Knowldgebasess from "./components/knowledgebases"
// import WorkFlowPage from "./pages/"

import VerifyOTPLogin from "./pages/VerifyOTPLogin";
import UpdateProfile from "./pages/UpdateProfile";
import AssignRole from "./pages/AssignRole";
import Register from "./pages/Register";
import VerifyOTPRegister from "./pages/VerifyOTPRegister";
import CustomizationPage from "./pages/CustomizationPage";

function App() {
  return (
    <>
      <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/api/auth/verifyOTPLogin" element={<VerifyOTPLogin />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                <Route path="/assignRole" element={<AssignRole />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/api/auth/verifyOTPRegister" element={<VerifyOTPRegister />} />
                <Route path="/FAQ" element={<Knowldgebasess/>} />
                <Route path="/login" element={<Homepage />} />
                {/* <Route path="/workflow" element={<WorkFlowPage />} /> */}
                <Route path="/chat" element={<LiveChat />} />
                <Route path="/TicketHome" element={<TicketHome />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/UpdateTicket" element={<UpdateTicket />} />
                <Route path="/RateTicket" element={<RateTicket />} />
                <Route path="/report" element={<Report />} />
                <Route path="/charts" element={<Reportchart />} />
                <Route path="/veiwreports" element={<Getreports />} />
                <Route path="/styleCustomize" element={<CustomizationPage />} />
      </Routes>
    </>
  );
}
export default App