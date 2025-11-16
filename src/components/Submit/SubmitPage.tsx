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
      // Send the data to your serverless function
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update status and clear the form on success
      setStatus('Success! Your clip was submitted.');
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      // Show an error message if anything fails
      setStatus('Error: Could not submit your clip.');
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
