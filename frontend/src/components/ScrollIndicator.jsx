// src/components/ScrollIndicator.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';

const ScrollIndicator = () => {
    const scrollTrackRef = useRef(null);
    const scrollThumbRef = useRef(null);

    const [isMouseDownOrTouchOnTrack, setIsMouseDownOrTouchOnTrack] = useState(false);

    // Constants for layout
    const NAVBAR_HEIGHT = 111; // px
    const INDICATOR_PADDING_TOP = 20; // px
    const INDICATOR_PADDING_BOTTOM = 20; // px
    const MIN_THUMB_HEIGHT = 20; // px

    const rAFId = useRef(null); // For requestAnimationFrame debounce

    // Helper function to get Y coordinate from mouse or touch event
    const getClientY = useCallback((e) => {
        return e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    }, []);

    // Memoize the scroll handler
    const handleScroll = useCallback(() => {
        if (rAFId.current) {
            cancelAnimationFrame(rAFId.current);
        }

        rAFId.current = requestAnimationFrame(() => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = document.documentElement.scrollTop;

            const thumbElement = scrollThumbRef.current;
            const trackElement = scrollTrackRef.current;

            if (!thumbElement || !trackElement) return;

            if (totalHeight > 0) {
                const trackHeight = trackElement.clientHeight;
                let calculatedThumbHeight = (window.innerHeight / document.documentElement.scrollHeight) * trackHeight;
                calculatedThumbHeight = Math.max(MIN_THUMB_HEIGHT, calculatedThumbHeight);

                let calculatedScrollPercentage = (scrolled / totalHeight);
                const thumbTop = calculatedScrollPercentage * (trackHeight - calculatedThumbHeight);

                thumbElement.style.height = `${calculatedThumbHeight}px`;
                thumbElement.style.top = `${thumbTop}px`;
                thumbElement.style.opacity = '1';
                thumbElement.style.pointerEvents = 'auto';
            } else {
                thumbElement.style.opacity = '0';
                thumbElement.style.pointerEvents = 'none';
            }
        });
    }, []);

    // Memoize the scroll to position handler for dragging
    const scrollToPosition = useCallback((clientY) => {
        if (scrollTrackRef.current && scrollThumbRef.current) {
            const scrollTrackRect = scrollTrackRef.current.getBoundingClientRect();
            const thumbElement = scrollThumbRef.current;

            const relativeClickY = clientY - scrollTrackRect.top;
            const effectiveTrackHeight = scrollTrackRect.height;
            const currentThumbHeight = thumbElement.clientHeight;

            let percentage = (relativeClickY - (currentThumbHeight / 2)) / (effectiveTrackHeight - currentThumbHeight);
            percentage = Math.max(0, Math.min(1, percentage));

            const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({
                top: totalScrollableHeight * percentage,
                behavior: 'auto',
            });
        }
    }, []);

    // Mouse/Touch Start Handler (on the track)
    const handleStart = useCallback((e) => {
        e.preventDefault(); // Prevent default touch behavior (e.g., scrolling the page itself)
        setIsMouseDownOrTouchOnTrack(true);
        if (scrollThumbRef.current) {
            scrollThumbRef.current.style.transition = 'none'; // Instant jump
        }
        scrollToPosition(getClientY(e));
    }, [scrollToPosition, getClientY]);

    // Mouse/Touch Move Handler (global, for dragging)
    const handleMove = useCallback((e) => {
        if (isMouseDownOrTouchOnTrack) {
            e.preventDefault(); // Prevent default scrolling while dragging
            requestAnimationFrame(() => {
                scrollToPosition(getClientY(e));
            });
        }
    }, [isMouseDownOrTouchOnTrack, scrollToPosition, getClientY]);

    // Mouse/Touch End/Cancel Handler (global, to stop dragging)
    const handleEnd = useCallback(() => {
        setIsMouseDownOrTouchOnTrack(false);
        if (scrollThumbRef.current) {
            // Reapply transition after drag/touch ends
            scrollThumbRef.current.style.transition = 'top 0.1s ease-out, height 0.1s ease-out, transform 0.2s ease, background-color 0.2s ease';
        }
    }, []);

    // Effect for attaching/detaching global event listeners
    useEffect(() => {
        // Scroll event
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Mouse events
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        // Touch events
        document.addEventListener('touchmove', handleMove, { passive: false }); // Needs to be non-passive to allow e.preventDefault()
        document.addEventListener('touchend', handleEnd);
        document.addEventListener('touchcancel', handleEnd); // Handle cases where touch is interrupted

        // Initial call to set the correct position/visibility on mount
        const timeoutId = setTimeout(() => {
            handleScroll();
        }, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);

            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
            document.removeEventListener('touchcancel', handleEnd);

            if (rAFId.current) {
                cancelAnimationFrame(rAFId.current);
            }
            clearTimeout(timeoutId);
        };
    }, [handleScroll, handleMove, handleEnd]); // Dependencies

    const effectiveScrollTrackHeightStyle = `calc(100vh - ${NAVBAR_HEIGHT + INDICATOR_PADDING_TOP + INDICATOR_PADDING_BOTTOM}px)`;

    return (
        <div
            className={`fixed right-0 w-3 lg:w-4 z-50 flex flex-col items-center justify-start group`}
            ref={scrollTrackRef}
            onMouseDown={handleStart} // Mouse start on track
            onTouchStart={handleStart} // Touch start on track
            style={{
                top: `${NAVBAR_HEIGHT}px`,
                height: effectiveScrollTrackHeightStyle,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(147,51,234,0.1) 20%, 80%, transparent 100%)',
                paddingTop: `${INDICATOR_PADDING_TOP}px`,
                paddingBottom: `${INDICATOR_PADDING_BOTTOM}px`,
                boxSizing: 'border-box',
                userSelect: 'none',
                cursor: 'pointer',
                // Important for mobile: prevent default touch actions like highlighting or zoom
                touchAction: 'none',
            }}
        >
            <div
                ref={scrollThumbRef}
                className={`absolute w-full bg-purple-700 rounded-full shadow-lg will-change-transform will-change-opacity
                    ${isMouseDownOrTouchOnTrack ? 'scale-x-150 bg-purple-900' : 'group-hover:scale-x-125'} `}
                style={{
                    height: `${MIN_THUMB_HEIGHT}px`,
                    top: '0px',
                    opacity: 0,
                    transition: isMouseDownOrTouchOnTrack ? 'none' : 'top 0.1s ease-out, height 0.1s ease-out, transform 0.2s ease, background-color 0.2s ease',
                    cursor: 'grab', // For desktop
                    // Important for mobile: allow direct manipulation without native scroll
                    touchAction: 'none',
                }}
            ></div>
        </div>
    );
};

export default ScrollIndicator;