import './PrivacyPage.css';
import SplitText from '../../components/ReactBitsStuff/SplitText'; 
import FadeContent from '../../components/ReactBitsStuff/FadeContent/FadeContent';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const PrivacyPage = () => {
  return (
    <div className='privacy-page-wrapper'>
      <div className="support-welcome">
        <SplitText
          text="Privacy Policy"
          delay={15}
        />
      </div>

      <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
       <div className="privacy-content-box">
            
            <div className='privacy-body'>
              <SplitText
                text="i will never steal your data/use your channel name for harm, do not worry!
                also, do not be afraid to be anonymous with your submissions!"
                delay={15}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>


       </div>
      </FadeContent>
    </div>
  );
};

export default PrivacyPage;
