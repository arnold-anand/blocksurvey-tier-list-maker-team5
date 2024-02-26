import logo from "./logo.svg";
import "./App.css";
import { NhostProvider } from "@nhost/react";
import { nhost } from "./lib/nhost";
import CreateAccount from "./components/CreateAccount";
import Signin from "./components/SignIn";
function App() {
  return (
    <div className="App bg-[#F8F7F4] h-screen">
      <NhostProvider nhost={nhost}>
        {/* <CreateAccount /> */}
        <Signin />
      </NhostProvider>
    </div>
  );
}

export default App;
