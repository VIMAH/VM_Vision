import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Web3Dashboard from './components/Web3Dashboard';
import './App.css';

function App() {
    return (
        <Web3Provider>
            <Router>
                <div className="App">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/dashboard" element={<Web3Dashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </Web3Provider>
    );
}

export default App;
