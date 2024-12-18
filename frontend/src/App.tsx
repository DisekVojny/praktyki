import { Route, Routes, useLocation } from "react-router";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState, Suspense, lazy } from "react";
import { Spinner } from "@nextui-org/react";

const Overview = lazy(() => import("./HabitOverview/Overview"));
const Create = lazy(() => import("./CreateHabit/Create"));
const HabitList = lazy(() => import("./HabitList/HabitList"));
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Login/Register"));

function App() {
  const [logged, setLogged] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetch("/islogged")
      .then(res => res.text())
      .then(text => {
        setLogged(Boolean(text));
      });
  }, []);

  if (logged === false && location.pathname !== "/login" && location.pathname !== "/register") {
    window.location.href = "/login";
  }
  if (logged === null) return <Spinner color="secondary" className="spinner" />;

  return (
    <div className="container">
      {logged && <Navbar />}
      <div className="page">
        <Suspense fallback={<Spinner color="secondary" />}>
          <Routes>
            <Route path="/" element={<HabitList />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/overview/:id" element={<Overview />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
