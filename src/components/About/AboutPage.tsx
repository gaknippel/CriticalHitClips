import './AboutPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import type { DownloadCloud } from 'lucide-react';


const AboutPage = () => {
  return (
    <div>
      
      <SplitText className='about-welcome'
        text="About"
        delay={15}
      />

      
    </div>
  );
};

export default AboutPage;
