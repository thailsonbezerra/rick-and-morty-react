import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import Characters from "./Components/Characters/Characters"
import About from "./Components/About/About"
import Character from "./Components/Character/Character"
import TypeIt from "./Components/TypeIt/TypeIt"
import Dashboard from "./Components/Dashboard/Dashboard"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="content">
        <Routes>
          <Route path="/" element={<Characters/>}></Route>
          <Route path="sobre" element={<About/>}></Route>
          <Route path="character/:id" element={<Character/>}></Route>
          <Route path="digite" element={<TypeIt/>}></Route>
          <Route path="dashboard" element={<Dashboard/>}></Route>
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
