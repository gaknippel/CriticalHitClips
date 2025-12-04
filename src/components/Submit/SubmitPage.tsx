import './SubmitPage.css';
import SplitText from '../../components/ReactBitsStuff/SplitText';
import React, { useState } from 'react';
import submitPageClip from '../../assets/submitPageBG.mp4';
import FadeContent from '../../components/ReactBitsStuff/FadeContent/FadeContent';

const Submit = () => {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // prevent double submission
    
    setIsSubmitting(true);
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

      const result = await response.json();

      if (response.status === 429) {
        // rate limited
        const resetTime = result.resetTime ? new Date(result.resetTime) : null;
        const timeString = resetTime 
          ? resetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : 'later';
        setStatus(`Too many submissions! Please try again after ${timeString}.`);
      } else if (!response.ok) {
        setStatus(result.error || 'Error: could not submit your clip.');
      } else {
        setStatus('Success! your clip has been submitted');
        (e.target as HTMLFormElement).reset();
        
        // show remaining submissions if available
        if (result.remaining !== undefined) {
          setTimeout(() => {
            setStatus(`Success! You have ${result.remaining} submission${result.remaining !== 1 ? 's' : ''} remaining this hour.`);
          }, 2000);
        }
      }
    } catch (error) {
      setStatus('Error: could not connect to server. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Clip'}
              </button>
              
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