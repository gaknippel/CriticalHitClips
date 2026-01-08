import './SupportPage.css';
import SplitText from '../../components/ReactBitsStuff/SplitText'; 
import steamFacepalm from '../../assets/steamFacepalm.gif';
import FadeContent from '../../components/ReactBitsStuff/FadeContent/FadeContent';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const SupportPage = () => {
  return (
    <div className='support-page-wrapper'>
      <div className="support-welcome">
        <SplitText
          text="Support"
          delay={15}
        />
      </div>
      
      <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
       <div className="support-content-box">
            
            <div className='support-left'>
              <SplitText
                text="problems? contact criticalhitclips@protonmail.com"
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

            <div className="support-right">
              <img 
                src={steamFacepalm} 
                alt="TF2 Animation" 
                className="side-image" 
              />
            </div>
       </div>
      </FadeContent>
    </div>
  );
};

export default SupportPage;