import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Knowldgebasess from "./pages/knowldgebases";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";
import Ticket from "./pages/Ticket";
import StartRestore from '../components/restore';
import Customization from '../components/CustomizationCheck';
import Check from './CustomizationForm';
import UpdateCustomization from './UpdateCustomization';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/FAQ" element={<Knowldgebasess/>} />
                <Route path="/login" element={<Homepage />} />
                <Route path="/workflow" element={<WorkFlowPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/restore" element={<StartRestore />} />
                <Route path="/CustomizationForm" element={<Check />} />
                <Route path="/UpdateCustomization" element={<UpdateCustomization />} />
                <Route path="/CustomizationCheck" element={<Customization />} />

            </Routes>
        </>
    );
  }
  
  export default App;
