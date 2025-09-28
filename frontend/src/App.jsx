import {Routes, Route} from 'react-router'
import Home from './Pages/Home'
import CreateNote from './Pages/CreateNote'
import NoteDetails from './Pages/NoteDetail'

const App = () => {
  return (
    <div className='relative h-full w-full' data-theme="forest">
      <div className='absolute inset-0 -z-10 w-full items-center px-5 py-24 [background: radial-gradient(125%_125%_at_50%_10%, #000_60%, #00ff9d40_100%)]'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateNote/>}/>
        <Route path='/note/:id' element={<NoteDetails/>}/>
      </Routes>

    </div>
  )
}

export default App
