
import Home from "./home.jsx"
import './App.css'
import MainPage from "./MainPage.jsx";
import Welcome from "./Welcome.jsx"
import EmailList from "./EmailList.jsx"
import About from "./About.jsx"
import VideoShow from "./VideoShow.jsx"
import "./Welcome.css"
import About2 from "./About2.jsx"
import Zitzroy from "./Zitzroy.jsx"
import Review from "./Review.jsx"
import Footer from "./Footer.jsx"

function App() {
  /*const [count, setCount] = useState(0)*/

  return (
      <div className="welcomeClass">
          <Home/>
          <MainPage />
          <Welcome />
          <EmailList />
          <About />
          <VideoShow />
          <About2 />
          <Zitzroy />
          <Review />
          <Footer />

      </div>
  )
}

export default App
