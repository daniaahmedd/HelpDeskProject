import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Knowledgebases from "./pages/Knowledgebases";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";
import LiveChat from "./pages/livechat";

import TicketHome from "./pages/TicketHome";
import Ticket from "./pages/Ticket";
import UpdateTicket from "./pages/UpdateTicket";
import RateTicket from "./pages/RateTicket";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/FAQ" element={<Knowldgebasess/>} />
                <Route path="/login" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/chat" element={<LiveChat />} />
                <Route path="/TicketHome" element={<TicketHome />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/UpdateTicket" element={<UpdateTicket />} />
                <Route path="/RateTicket" element={<RateTicket />} />
            </Routes>
        </>
    );
}

