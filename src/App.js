import { Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import { SidebarProvider } from "./context/SidebarContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </SidebarProvider>
    </UserProvider>
  );
}

export default App;
