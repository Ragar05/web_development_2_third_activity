import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import { HomePage } from "./Page/HomePage";
import { LoginPage } from "./Page/LoginPage";
import { useAuthContext } from "./context/Auth.context";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <NavBar />
      { user && <HomePage />}
      {!user && <LoginPage />}
    </>
  );
}

export default App;
