import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const SingleImage = ({slug, url, caption="", align="None"}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  // Handle lightbox open/close effects
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      // Add event listener for Escape key
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when lightbox is open
      document.body.classList.add('lightbox-open');
    } else {
      // Re-enable scrolling when lightbox is closed
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.classList.remove('lightbox-open');
    };
  }, [isLightboxOpen]);

  const imageSrc = `/posts/projects/${slug}/${url}`;

  // Render the main SingleImage component
  const singleImageElement = (
    <div className={`SingleImage Align${align}`}>
      <img 
        src={imageSrc} 
        onClick={toggleLightbox} 
        className={`SingleImage__Thumbnail Align${align}`}
      />
      <p>{caption}</p>
    </div>
  );
  
  // Render the lightbox outside the normal DOM hierarchy using Portal
  // Fixes the album's overflow:hidden thing
  const lightboxElement = isLightboxOpen && (
    ReactDOM.createPortal(
      <div className="Lightbox" onClick={toggleLightbox}>
        <div className="Lightbox__Overlay"></div>
        <div className="Lightbox__ContentWrapper">
          <img 
            src={imageSrc} 
            className="Lightbox__Image" 
            onClick={(e) => e.stopPropagation()}
          />
          {caption && (
            <p className="Lightbox__Caption">{caption}</p>
          )}
        </div>
        <button className="Lightbox__CloseBtn" onClick={toggleLightbox}>×</button>
      </div>,
      document.body // Append to body, outside of Album's DOM hierarchy
    )
  );

  return (
    <>
      {singleImageElement}
      {lightboxElement}
    </>
  );
};

export default SingleImage;