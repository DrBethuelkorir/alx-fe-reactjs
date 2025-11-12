import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Services from "./Service"  // Fixed import
import Contact from "./Contact"
import Navbar from "./Navbar"

function App() {
 

  return (
    <div>
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App