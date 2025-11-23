import './SupportPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import steamFacepalm from '../../assets/steamFacepalm.gif'

  const handleAnimationComplete = () => {

  console.log('All letters have animated!');

};


const SupportPage = () => {
  return (
    <div className='support-page-wrapper'>
      <SplitText
        className='welcome-message'
        text="Support"
        delay={15}
      />
       <div className="support-content-box">
              <SplitText

              text="problems? contact gaknippel@hotmail.com"

              delay={15}

              duration={0.6}

              ease="power3.out"

              splitType="chars"

              from={{ opacity: 0, y: 40 }}

              to={{ opacity: 1, y: 0 }}

              className='support-left'

              threshold={0.1}

              rootMargin="-100px"

              textAlign="center"

              onLetterAnimationComplete={handleAnimationComplete}

            />

            <div className="support-right">
              <img 
                src={steamFacepalm} 
                alt="TF2 Animation" 
                className="side-image" 
              />
            </div>
       </div>
    </div>
  );
};

export default SupportPage;
