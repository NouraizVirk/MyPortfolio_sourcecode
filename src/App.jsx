import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import { PortfolioDataProvider } from './contexts/PortfolioDataContext';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/BentoGrid';
import SkillsMarquee from './components/SkillsMarquee';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function PortfolioHome() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <NavBar />

            <main className="relative z-10">
                <Hero />
                <Experience />
                <Projects />
                <SkillsMarquee />
                <Certifications />
                <Leadership />
                <Contact />
            </main>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <PortfolioDataProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<PortfolioHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </PortfolioDataProvider>
        </AuthProvider>
    );
}

export default App;
