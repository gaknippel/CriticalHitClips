import { Outlet } from 'react-router-dom';
import './App.css'
import "@radix-ui/themes/styles.css";
import Header from './components/Header';
import Footer from './components/Footer'
import logo from './assets/tf2darklogo.png'
import LightRays from './components/ReactBitsStuff/LightRays';

function App() {

  return (
    <div>
      <Header />
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={1}
        lightSpread={0.8}
        rayLength={1}
        followMouse={true}
        mouseInfluence={0.01}
        noiseAmount={0.1}
        distortion={0.05}
        className="animBG"
      />
      <div className='pageBG'>
        <div className='spinningLogo'>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="content-wrap">
        <Outlet />
      </div>
        <Footer />
      </div>
    </div>
  )
}

export default App