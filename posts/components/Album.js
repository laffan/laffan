import React, { useState, useEffect, useRef } from 'react';

const Album = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidths, setImageWidths] = useState([]);
  const innerImagesRef = useRef(null);
  const childrenArray = React.Children.toArray(children);

  // Function to calculate and update image widths
  const updateImageWidths = () => {
    if (innerImagesRef.current) {
      const singleImages = innerImagesRef.current.querySelectorAll('.SingleImage');
      const widths = Array.from(singleImages).map(img => img.offsetWidth);
      setImageWidths(widths);
    }
  };

  // Initial calculation and periodic rechecking
  useEffect(() => {
    updateImageWidths();
    
    // Set up initial interval for rechecking image widths
    const intervalId = setInterval(updateImageWidths, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [children]);

  // Handle scrolling to the current image
  useEffect(() => {
    if (innerImagesRef.current && imageWidths.length > 0) {
      // Calculate the scroll position based on the current index
      const scrollPosition = imageWidths
        .slice(0, currentIndex)
        .reduce((total, width) => total + width, 0);
      
      innerImagesRef.current.style.transform = `translateX(-${scrollPosition}px)`;
    }
  }, [currentIndex, imageWidths]);

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < childrenArray.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Handle previous button click
  const handlePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : childrenArray.length - 1
    );
  };

  return (
    <div className="Album">
      <button className="Album__PrevBtn" onClick={handlePrev}></button>
      <div className="Album__Inner">
        <div 
          className="Album__InnerImages" 
          ref={innerImagesRef}
        >
          {children}
        </div>
      </div>
      <button className="Album__NextBtn" onClick={handleNext}></button>
    </div>
  );
};

export default Album;