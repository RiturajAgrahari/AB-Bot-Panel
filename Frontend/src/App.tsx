import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/dashboard'
import NotFound from './pages/NotFound'
import FandomBot from './pages/fandomBot'
import RPGBot from './pages/rpgBot'
import Inventory from './pages/inventory'
import Profile from './pages/EachProfile'
import LuckyBot from './pages/luckyBot'
import TodayLuck from './pages/today_luck'
import Profiles from './pages/profiles'
import UserProfile from './pages/profile'

type ProfileWrapperProps = {
  activeSidebarLink: number;
};
function App() {

  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  const ProfileWrapper = ({ activeSidebarLink }: ProfileWrapperProps) => {
    const { number } = useParams(); // Extract the URL parameter
    if (!number) {
      // Handle the case where number is undefined
      return <div>Error: Profile number is missing.</div>;
    }

    return <Home activeSidebarLink={activeSidebarLink} component={<UserProfile profile_uid={number} />} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home activeSidebarLink={0} component={<Dashboard />}/></ProtectedRoute>}/>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/logout' element={<Logout />} ></Route>
        <Route path='/fandom-bot' element={<ProtectedRoute><Home activeSidebarLink={2} component={<FandomBot />}/></ProtectedRoute>} ></Route>
        <Route path='/lucky-bot' element={<ProtectedRoute><Home activeSidebarLink={1} component={<LuckyBot />}/></ProtectedRoute>} ></Route>
        <Route path='/lucky-bot/profiles' element={<ProtectedRoute><Home activeSidebarLink={1} component={<TodayLuck />}/></ProtectedRoute>} ></Route>
        <Route path='/rpg-bot' element={<ProtectedRoute><Home activeSidebarLink={3} component={<RPGBot />}/></ProtectedRoute>} ></Route>
        <Route path='/rpg-bot/inventory' element={<ProtectedRoute><Home activeSidebarLink={3} component={<Inventory />}/></ProtectedRoute>} ></Route>
        <Route path='/profiles' element={<ProtectedRoute><Home activeSidebarLink={4} component={<Profiles />}></Home></ProtectedRoute>} />
        <Route path='/profiles/profile' element={<ProtectedRoute><Home activeSidebarLink={4} component={<Profile />}/></ProtectedRoute>} />
        <Route path='/profile/:number' element={<ProtectedRoute><ProfileWrapper activeSidebarLink={4}/></ProtectedRoute>} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
