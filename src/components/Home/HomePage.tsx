import SplitText from '../ReactBitsStuff/SplitText';
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
