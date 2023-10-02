import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import { HomePage } from "./Page/HomePage";

function App() {
  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
}

export default App;
