import SplitText from '../ReactBitsStuff/SplitText';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='home-page-wrapper'>
      <SplitText
        className='welcome-message'
        text="Welcome to CriticalHitClips!"
        delay={15}
      />
    </div>
  );
};

export default HomePage;
