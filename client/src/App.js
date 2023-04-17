import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import VisitorList from "./pages/VisitorList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckIn/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/visitorlist" element={<VisitorList/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
