import React from 'react'
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Contact from "./sections/Contact.jsx";

const App = () => {
    return (
        <main className="w-full mx-auto">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Clients/>

            <Contact/>
        </main>
    )
}
export default App
