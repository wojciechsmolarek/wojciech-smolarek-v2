import { useEffect, useState } from 'react';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Check if we're on a touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        document.body.classList.add('custom-cursor');
        setIsMounted(true);

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updatePosition);

        // Use setTimeout to ensure DOM is ready
        const timer = setTimeout(() => {
            const interactiveElements = document.querySelectorAll('a, button, summary, details, .interactive');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', updatePosition);
            const interactiveElements = document.querySelectorAll('a, button, summary, details, .interactive');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isVisible]);

    // Don't render on server or touch devices
    if (!isMounted) {
        return null;
    }

    return (
        <div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out hidden md:block"
            style={{
                transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
            }}
        >
            <div
                className={`rounded-full bg-white transition-all duration-300 ease-in-out ${isHovering ? 'w-24 h-24 opacity-100' : 'w-3 h-3 opacity-100'
                    }`}
            />
        </div>
    );
};

export default Cursor;
