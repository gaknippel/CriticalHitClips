import './SubmitPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import React, { useState } from 'react';
import submitPageClip from '../../assets/submitPageBG.mp4';
import FadeContent from '../ReactBitsStuff/FadeContent/FadeContent';

const Submit = () => {

  const[status, setStatus]  = useState('');

  const handleSubmit = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    setStatus('Submitting...');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());  


    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('network response didnt work');
      }

      setStatus('Success! your clip has been submitted');
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      setStatus('Error: could not submit your clip.');
      console.error('Fetch error:', error);
    }
  }

  const handleAnimationComplete = () => {

  console.log('All letters have animated!');

};


    return (

<div className="submit-page-wrapper">
      <div className="submit-welcome">

         <SplitText

  text="Submit a Clip!"

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

      <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0}>

      <div className="submit-content-box">
        
        <div className="submit-left">
          <form onSubmit={handleSubmit}>
            <div className="form-body">
              <label htmlFor="name">Channel Name (optional)</label>
              <input type="text" id="name" name="name" placeholder="Your Channel Name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="clipURL">Clip URL (Twitch, YouTube)</label>
              <input type="url" id="clipURL" name="clipURL" required placeholder="https://..." />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message (optional)</label>
              <textarea id="message" name="message" rows={4} placeholder="Tell me context I should know in yo clip..." />
            </div>
            
            <button type="submit">Submit Clip</button>
            
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>


        <div className="submit-right">
          <video className="side-video" autoPlay loop muted playsInline>

             <source src={submitPageClip} type="video/mp4" />

          </video>
        </div>

      </div>
      </FadeContent>
    </div>

      
    );
};

export default Submit;
