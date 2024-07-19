import './App.css'
import { Link } from 'react-router-dom'
function App() {
  return (
  
      <div className='flex items-center justify-center min-h-screen bg-gray-100 flex-col  ' >
       <section className="actions w-50 flex items-center justify-center flex-col " >
       <h1 className= "text-3xl text-blue-500 font-bold"> welcome to the todo application   </h1>

      <Link to="/login" className="text-decoration-none w-full py-2 px-4 mt-8 text-white bg-blue-500 rounded hover:bg-red-500 text-bold"> Login </Link>

<p className='text-orange-500 text-sm mt-8'> if you don't have an account , please register </p>
      <Link to="/register" className="text-decoration-none w-full py-2 px-4 mt-2 text-white bg-blue-500 rounded hover:bg-orange-500 tex-bold"> Register </Link>
       </section>

      </div>
    
      )
}

export default App
