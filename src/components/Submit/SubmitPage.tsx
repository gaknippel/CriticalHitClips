import './SubmitPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import React, { useState } from 'react';
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

      setStatus('success! your clip has been submitted');
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

      <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0}>
        <div className="submit-left">
          <form onSubmit={handleSubmit}>
            <div className="form-body">
              <label htmlFor="name">Your Name (optional)</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="clipUrl">Clip URL (Twitch, YouTube)</label>
              <input type="url" id="clipUrl" name="clipUrl" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea id="message" name="message" rows={2} />
            </div>
            
            <button type="submit">
              Submit Clip
            </button>
            
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>  
        </FadeContent> 
  </div>

    
  );
};

export default Submit;
