import "./index.css"
import { Route, Routes } from "react-router-dom"
import Edit from "./Pages/Edit"
import NewNote from "./Pages/New"


const App = () => {
  return (
    <Routes>
    
      <Route path="/new" element={<NewNote />} />
      <Route path="*" element={<div className="text-center bg-blue-500 h-screen flex align-center justify-center items-center">Page Not Found</div>} />

      <Route path="/:id">
      <Route index element={<div>Home</div>} />
      <Route path="edit" element={<Edit/>} />
      </Route>
      
    </Routes>
   
  )
}

export default App
