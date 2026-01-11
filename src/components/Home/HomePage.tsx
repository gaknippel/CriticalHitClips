import SplitText from "../ReactBitsStuff/SplitText";
import "./HomePage.css";

// To add more videos, add a new object to this array
const videos = [
  {
    id: "dQw4w9WgXcQ", // Replace with your YouTube video ID
    title: "Check out the latest video!",
    description:
      "This is a placeholder video. You can replace the ID with your own YouTube video ID.",
  },
];

const HomePage = () => {
  return (
    <div className="home-page-wrapper">
      <SplitText
        className="welcome-message"
        text="Welcome to CriticalHitClips!"
        delay={15}
      />
      <div className="video-section">
        {videos.map((video) => (
          <div key={video.id} className="video-container">
            <h2>{video.title}</h2>
            <div className="video-embed">
              <iframe 
              width="2403" 
              height="1155" 
              src="https://www.youtube.com/embed/74h3OdWCyl4" 
              title="TF2 MOST VIEWED Clips of The Month! | criticalhitclips#1" 
              frameBorder="0" 
              allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture; 
              web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
                
              </iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
