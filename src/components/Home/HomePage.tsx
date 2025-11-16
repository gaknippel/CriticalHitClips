import LightRays from '../ReactBitsStuff/LightRays';
import SplitText from '../ReactBitsStuff/SplitText';
import logo from '../../assets/tf2darklogo.png';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <SplitText
        className='welcome-message'
        text="Welcome to CriticalHitClips!"
        delay={15}
      />
    </>
  );
};

export default HomePage;
