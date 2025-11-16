import './SubmitPage.css';
import SplitText from '../ReactBitsStuff/SplitText';
import React, { useState } from 'react';

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
        text="Submit a Clip"
        delay={15}
      />
      
    </div>
  );
};

export default Submit;
