import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Knowledgebases from "./pages/Knowledgebases";
import WorkFlowPage from "./pages/WorkFlowPage";
import ReportPage from "./pages/ReportPage";
import Ticket from "./pages/Ticket";
import StartRestore from '../components/StartRestore';
import CustomizationCheck from '../components/CustomizationCheck';
import CustomizationForm from './CustomizationForm';
import UpdateCustomization from './UpdateCustomization';

function App() {
    return (
        <>
<Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/FAQ" element={<Knowledgebases />} />
    <Route path="/login" element={<Homepage />} />
    <Route path="/workflow" element={<WorkFlowPage />} />
    <Route path="/report" element={<ReportPage />} />
    <Route path="/Ticket" element={<Ticket />} />
    <Route path="/restore" element={<StartRestore />} />
    <Route path="/CustomizationForm" element={<CustomizationForm />} />
    <Route path="/UpdateCustomization" element={<UpdateCustomization />} />
    <Route path="/CustomizationCheck" element={<CustomizationCheck />} />
</Routes>
        </>
    );
}

  export default App;
