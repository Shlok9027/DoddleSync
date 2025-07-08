// src/components/ScrollIndicator.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMouseDownOnTrack, setIsMouseDownOnTrack] = useState(false);
  const scrollTrackRef = useRef(null); 

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight; 
    const scrolled = document.documentElement.scrollTop;

    if (totalHeight > 0) {
      setScrollPercentage((scrolled / totalHeight) * 100);
    } else {
      setScrollPercentage(0); 
    }
  }, []);

  const scrollToPosition = useCallback((clientY) => {
    if (scrollTrackRef.current) {
      const scrollTrackRect = scrollTrackRef.current.getBoundingClientRect();
      const relativeClickY = clientY - scrollTrackRect.top;

      const effectiveTrackHeight = scrollTrackRect.height; 

      let percentage = relativeClickY / effectiveTrackHeight;

      percentage = Math.max(0, Math.min(1, percentage));
      
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: totalScrollableHeight * percentage,
        behavior: 'auto',
      });
    }
  }, []);

  const handleGlobalMouseMove = useCallback((e) => {
    if (isMouseDownOnTrack) {
      scrollToPosition(e.clientY);
    }
  }, [isMouseDownOnTrack, scrollToPosition]);

  const handleGlobalMouseUp = useCallback(() => {
    setIsMouseDownOnTrack(false); 
  }, []);

  const handleIndicatorMouseDown = useCallback((e) => {
    e.preventDefault(); 
    setIsMouseDownOnTrack(true); 
    scrollToPosition(e.clientY); 
  }, [scrollToPosition]);
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleScroll, handleGlobalMouseMove, handleGlobalMouseUp]); // Dependencies

  const thumbHeightPx = Math.max(20, (window.innerHeight / document.documentElement.scrollHeight) * scrollTrackRef.current?.clientHeight || 0);
  const thumbTopPx = (scrollPercentage / 100) * (scrollTrackRef.current?.clientHeight - thumbHeightPx || 0);

  const NAVBAR_HEIGHT = 111; 
  const INDICATOR_PADDING_TOP = 20; 
  const INDICATOR_PADDING_BOTTOM = 20; 

  const effectiveScrollTrackHeight = `calc(100vh - ${NAVBAR_HEIGHT + INDICATOR_PADDING_TOP + INDICATOR_PADDING_BOTTOM}px)`;


  return (
    <div
      className={`fixed right-0 w-3 lg:w-4 z-50 flex flex-col items-center justify-start group cursor-pointer`}
      ref={scrollTrackRef}
      onMouseDown={handleIndicatorMouseDown}
      style={{
        top: `${NAVBAR_HEIGHT}px`, 
        height: effectiveScrollTrackHeight, 
        background: 'linear-gradient(to bottom, transparent 0%, rgba(147,51,234,0.1) 20%, 80%, transparent 100%)',
        paddingTop: `${INDICATOR_PADDING_TOP}px`,
        paddingBottom: `${INDICATOR_PADDING_BOTTOM}px`,
        boxSizing: 'border-box', 
        userSelect: 'none', 
      }}
    >
      <div
        className={`absolute w-full bg-purple-700 rounded-full shadow-lg transition-all duration-100 ease-out 
          ${isMouseDownOnTrack ? 'scale-x-150 bg-purple-900' : 'group-hover:scale-x-125'} `}
        style={{
          height: `${thumbHeightPx}px`,
          top: `${thumbTopPx}px`, 
          opacity: thumbHeightPx > 0 && document.documentElement.scrollHeight > window.innerHeight ? 1 : 0, 
        }}
      ></div>
    </div>
  );
};

export default ScrollIndicator;