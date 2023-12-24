import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Knowldgebasess from "./pages/knowldgebases";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/FAQ" element={<Knowldgebasess/>} />
            </Routes>
        </>
    );
  }
  
  export default App;
