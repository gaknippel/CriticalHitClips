import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import LightRays from './components/ReactBitsStuff/LightRays'
import logo from './assets/tf2darklogo.png'
import './App.css'

import steamCryLaugh from './assets/steamCryLaugh.gif';
import steamCool from './assets/steamCool.gif';
import steamSleepy from './assets/steamSleepy.gif';
import steamFacepalm from './assets/steamFacepalm.gif';
import submitPageClip from './assets/submitPageBG.mp4';

//test :D

const Layout = () => {
    useEffect(() => {
    //prelaod the gifs
    const images = [steamCryLaugh, steamCool, steamSleepy, steamFacepalm];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // preload video
    const video = document.createElement('video');
    video.src = submitPageClip;
    video.preload = 'auto';
    video.load();
  }, []);


  return (
    <div>
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={1}
        lightSpread={0.8}
        rayLength={1}
        followMouse={false}
        mouseInfluence={0.01}
        noiseAmount={0.1}
        distortion={0.05}
        className="animBG"
      />
      
      <div className='spinningLogo'>
        <a href="/">
          <img src={logo} alt="CritTF2Clips Logo" />
        </a>
      </div>

      <Header />
      
      <div className='pageBG'>
        <div className="content-wrap">
          <Outlet />
        </div>        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;