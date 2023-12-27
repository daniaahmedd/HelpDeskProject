import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Knowldgebasess from "./components/knowledgebases";
import WorkFlowPage from "./pages/WorkFlowPage";
import LiveChat from "./pages/livechat";
import Report from "./components/report";
import Reportchart from "./components/reportcharts";
import Getreports from "./components/view-reports";
import TicketHome from "./pages/TicketHome";
import Ticket from "./pages/Ticket";
import RateTicket from "./pages/RateTicket";
import StartRestore from "./components/restore";
import VerifyOTPLogin from "./pages/VerifyOTPLogin";
import UpdateProfile from "./pages/UpdateProfile";
import AssignRole from "./pages/AssignRole";
import Register from "./pages/Register";
import VerifyOTPRegister from "./pages/VerifyOTPRegister";
import CustomizationCheck from "./components/CustomizationCheck";
import Customizationform from "./components/CustomizationForm";
import UpdateCustomization from "./components/UpdateCustomization";

import CustomizationPage from "./pages/CustomizationPage";
import UpdateTicket from "./components/UpdateTicket"


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
                <Route path="/RateTicket" element={<RateTicket />} />
                <Route path="/report" element={<Report />} />
                <Route path="/charts" element={<Reportchart />} />
                <Route path="/veiwreports" element={<Getreports />} />
                <Route path="/CustomizationCheck" element={<CustomizationCheck />} />
                <Route path="/CustomizationForm" element={<Customizationform />} />
                <Route path="/UpdateCustomization" element={<UpdateCustomization />} />

                <Route path="/restore" element={<StartRestore />} />
                <Route path="/UpdateTicket" element={<UpdateTicket />} />


      </Routes>
    </>
  );
}
export default App