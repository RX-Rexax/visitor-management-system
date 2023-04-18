import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import VisitorList from "./pages/VisitorList";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser.roles ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/visitorlist"
            element={
              <RequiredAuth>
                <VisitorList />
              </RequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
