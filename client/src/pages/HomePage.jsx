import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import SuccessHighlight from "../components/SuccessHighlight";
import Journey from "../components/Journey";
import Events from "../components/Events";
import Contact from "../components/contact";


export default function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Gallery />
            <SuccessHighlight />
            <Journey />
            <Events />
            <Contact />        </>
    );
}
