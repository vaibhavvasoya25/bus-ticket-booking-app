import "./App.scss";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Reservation from "./Pages/Reservation";
import AllocateSeat from "./Pages/AllocateSeat";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/reservation" element={<Reservation />}></Route>
        <Route path="/allocateSeat" element={<AllocateSeat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
