import './App.css'
import Login from './pages/Home/Login'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Home/dashboard'
import NotFound from './pages/Home/NotFound'
import FandomBot from './pages/fandomBot'
import RPGBot from './pages/RPGBot/rpgBot'
import Inventory from './pages/RPGBot/inventory'
import Profile from './pages/Profile/profileList'
import LuckyBot from './pages/LuckyBot/luckyBot'
import TodayLuck from './pages/LuckyBot/today_luck'
import Profiles from './pages/Profile/profiles'
import UserProfile from './pages/Profile/profile'
import PersonalizedBot from './pages/PersonalizedBot/personalizedBot'
import Charts from './pages/Chart'
import PersonalizedBotQuestion from './pages/PersonalizedBot/questions'
import PersonalizedBotAnswers from './pages/PersonalizedBot/answers'
import LuckyBotStatistics from './pages/LuckyBot/statistics'
import AddQuestion from './pages/PersonalizedBot/addQuestion'

type ProfileWrapperProps = {
  activeSidebarLink: number;
};
function App() {
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  const AnswerWrapper = ({activeSidebarLink}: ProfileWrapperProps) => {
    const {number} = useParams();
    console.log(number)
    if (!number) {
      return <div>Error: There is error in this question!</div>;
    }
    return  <Home activeSidebarLink={activeSidebarLink} component={<PersonalizedBotAnswers question_id={number} />} />;
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
        <Route path='/lucky-bot/statistics' element={<ProtectedRoute><Home activeSidebarLink={1} component={<LuckyBotStatistics />}/></ProtectedRoute>} ></Route>
        <Route path='/lucky-bot/profiles' element={<ProtectedRoute><Home activeSidebarLink={1} component={<TodayLuck />}/></ProtectedRoute>} ></Route>
        <Route path='/rpg-bot' element={<ProtectedRoute><Home activeSidebarLink={3} component={<RPGBot />}/></ProtectedRoute>} ></Route>
        <Route path='/rpg-bot/inventory' element={<ProtectedRoute><Home activeSidebarLink={3} component={<Inventory />}/></ProtectedRoute>} ></Route>
        <Route path='/personalized-bot' element={<ProtectedRoute><Home activeSidebarLink={4} component={<PersonalizedBot />}/></ProtectedRoute>} ></Route>
        <Route path='/personalized-bot/questions' element={<ProtectedRoute><Home activeSidebarLink={4} component={<PersonalizedBotQuestion />}/></ProtectedRoute>} ></Route>
        <Route path='/personalized-bot/questions/add-question' element={<ProtectedRoute><Home activeSidebarLink={4} component={<AddQuestion />}/></ProtectedRoute>} ></Route>
        <Route path='/personalized-bot/answers/' element={<ProtectedRoute> <Home activeSidebarLink={4} component={<PersonalizedBotAnswers question_id={""} />} /></ProtectedRoute>} ></Route>
        <Route path='/personalized-bot/answers/:number' element={<ProtectedRoute><AnswerWrapper activeSidebarLink={4}/></ProtectedRoute>} ></Route>
        <Route path='/profiles' element={<ProtectedRoute><Home activeSidebarLink={5} component={<Profiles />}></Home></ProtectedRoute>} />
        <Route path='/profiles/profile' element={<ProtectedRoute><Home activeSidebarLink={5} component={<Profile />}/></ProtectedRoute>} />
        <Route path='/profile/:number' element={<ProtectedRoute><ProfileWrapper activeSidebarLink={5}/></ProtectedRoute>} />
        <Route path='/charts' element={<ProtectedRoute><Home activeSidebarLink={8} component={<Charts />} /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
