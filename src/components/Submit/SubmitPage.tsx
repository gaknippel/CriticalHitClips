import './SubmitPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import React, { useState } from 'react';
import submitPageClip from '../../assets/submitPageClip.mp4';

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


  return (
    <div>
      
      <SplitText className='submit-welcome'
        text="Submit a Clip!"
        delay={15}
      />
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="video-background"
      >

        
        {<source src={submitPageClip} type="video/mp4" />}
      </video>

      <div className="video-overlay"></div>
      
          <div className="submit-left">
            <form onSubmit={handleSubmit}>
              <div className="form-body">
                <label htmlFor="name">Name (optional)</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="clipUrl">Clip URL (Twitch, YouTube)</label>
                <input type="url" id="clipURl" name="clipURL" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (optional)</label>
                <textarea id="message" name="message" rows={2} />
              </div>
              
              <button type="submit">
                Submit Clip
              </button>
              
              {status && <p className="status-message">{status}</p>}
            </form>
          </div>
    </div>

    
  );
};

export default Submit;
