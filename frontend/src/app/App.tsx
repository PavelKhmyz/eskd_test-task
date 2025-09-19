import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomePage } from '../pages/WelcomePage.tsx';
import { ContactPage } from '../pages/ContactPage.tsx';
import { NotificationProvider } from '../shared/providers/NotificationProvider.tsx';
import './style.css'


const App = () => {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <WelcomePage /> }/>
            <Route path='/contact' element={ <ContactPage /> } />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </>
  )
}

export default App
