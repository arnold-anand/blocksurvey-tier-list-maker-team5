import logo from "./logo.svg";
import "./App.css";
import { NhostProvider } from "@nhost/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { nhost } from "./lib/nhost";
import CreateAccount from "./components/CreateAccount";
import Signin from "./components/SignIn";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import NewTieron from "./components/NewTieron";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(nhost.auth.getSession());

    nhost.auth.onAuthStateChanged((_, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="App bg-[#F8F7F4] h-screen select-none">
      <NhostProvider nhost={nhost}>
        <Router>
          <Routes>
            <Route path="/signup" element={<CreateAccount />} />
            <Route
              path="/"
              element={session ? <Home session={session} /> : <Signin />}
            />
            <Route path="/new" element={<NewTieron session={session} />} />
          </Routes>
        </Router>
      </NhostProvider>
    </div>
  );
}

export default App;
