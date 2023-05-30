import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Characters from "./Components/Characters"
import About from "./Components/About"
import Character from "./Components/Character"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Characters/>}></Route>
          <Route path="sobre" element={<About/>}></Route>
          <Route path="character/:id" element={<Character/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
