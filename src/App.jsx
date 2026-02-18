import { Routes, Route } from "react-router-dom";
import { ChallengeProvider } from "./context/ChallengeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import Weeks from "./pages/Weeks";
import Progress from "./pages/Progress";
import "./App.css";

function App() {
  return (
    <ChallengeProvider>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #faf5ff 70%, #f0fdf4 100%)" }}>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-4 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/weeks" element={<Weeks />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ChallengeProvider>
  );
}

export default App;
