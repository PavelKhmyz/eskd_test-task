import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomePage } from '../pages/WelcomePage.tsx';
import { ContactPage } from '../pages/ContactPage.tsx';
import './style.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <WelcomePage /> }/>
          <Route path='/contact' element={ <ContactPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
