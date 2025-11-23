import './AboutPage.css';
import SplitText from '../ReactBitsStuff/SplitText';


const AboutPage = () => {
  return (
    <div className='submit-page-wrapper'>
      <SplitText
        className='welcome-message'
        text="About"
        delay={15}
      />
    </div>
  );
};

export default AboutPage;
