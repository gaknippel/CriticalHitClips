import './AboutPage.css';
import SplitText from '../../components/ReactBitsStuff/SplitText'; 
import FadeContent from '../../components/ReactBitsStuff/FadeContent/FadeContent'; 

// Import your GIFs
import steamCryLaugh from '../../assets/steamCryLaugh.gif'; 
import steamCool from '../../assets/steamCool.gif';
import steamSleepy from '../../assets/steamSleepy.gif';

const AboutPage = () => {
  return (
    <div className='about-page-wrapper'>
      
      <SplitText
        className='about-welcome-message'
        text="About"
        delay={15}
      />

      <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
        <div className="about-content-box">
          
          <div className="about-section">
            <h3>
              who am i?
              <img src={steamCool} alt="cool" className="header-icon" />
            </h3>
            <p>
              i'm greyson! this is just a hobby i have and this channel is made purely for fun, since i
              love tf2. i made this website and the channel, hope you enjoy!
            </p>
          </div>

          <div className="about-section">
            <h3>
              how do you get featured?
              <img src={steamSleepy} alt="sleepy" className="header-icon" />
            </h3>
            <p>
              i get clips from the top viewed clips on twitch, but you can also personally
              send me clips by clicking the submit button on top.
            </p>
          </div>

          <div className="about-section">
            <h3>
              what can you see here?
              <img src={steamCryLaugh} alt="laugh" className="header-icon" />
            </h3>
            <p>
              whether it's a massive nuke you had on a team in sixes, a nasty airshot,
              or simply just a killbind funny moment, you can see any clip related to tf2 here.
            </p>
          </div>

        </div>
      </FadeContent>
    </div>
  );
};

export default AboutPage;