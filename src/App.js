import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetails />} /> */}
      </Routes>
    </>
  );
}
export default App;
