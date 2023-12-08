import AccountPage from "./views/accounts";
import Login from "./components/login";
import Register from "./components/register";
import UserContextProvider from "./context/userContext";
import LandingPage from "./pages/landingpage";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import RegisterPlace from "./components/registerPlace";
import PLaceInfo from "./views/placeInfo";

function App() {
  return ( 
    <UserContextProvider>
      <Router>
        <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/account/:subpage?" element={<AccountPage/>}/>
              <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
              <Route path="/account/places/:id" element={<RegisterPlace/>}/>
              <Route path="/placeInfo/:id" element={<PLaceInfo/>}/>
          </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
