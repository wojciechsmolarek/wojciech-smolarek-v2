import { useState, useEffect } from 'react';

interface NavbarProps {
    currentPath?: string;
}

const Navbar = ({ currentPath = '/' }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            document.documentElement.dataset.scrolled = String(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    };

    // Navigation Items
    const menuItems = [
        { label: 'Start', path: '/' },
        { label: 'Audyt techniczny', path: '/audyt-techniczny-seo' },
        { label: 'Kontakt', path: '/kontakt' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-start transition-all duration-300 ${isOpen ? 'mix-blend-normal text-black' : 'mix-blend-difference text-white'
                    }`}
            >
                <a href="/" className="font-display font-bold text-xl uppercase tracking-widest relative z-50 hover:opacity-50 transition-opacity interactive">
                    WS.
                </a>

                <button
                    onClick={toggleMenu}
                    className="relative z-50 group cursor-pointer interactive focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <div className="flex flex-col items-end gap-1.5 w-8">
                        <span
                            className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2.5' : 'w-full group-hover:w-1/2'
                                }`}
                        />
                        <span
                            className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-8 opacity-0' : 'w-3/4 group-hover:w-full'
                                }`}
                        />
                        <span
                            className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-1' : 'w-1/2 group-hover:w-3/4'
                                }`}
                        />
                    </div>
                </button>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#f4f4f4] z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]`}
                style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-100%)' }}
            >
                <div className="flex flex-col gap-8 text-center">
                    {menuItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.path}
                            aria-current={currentPath === item.path ? 'page' : undefined}
                            className={`font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter hover:text-gray-500 transition-colors interactive overflow-hidden group ${currentPath === item.path ? 'text-gray-500' : ''}`}
                        >
                            <span className="inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0" style={{ transitionDelay: `${index * 50}ms` }}>
                                {/* Reveal effect helper */}
                            </span>
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="absolute bottom-12 text-center font-mono text-xs uppercase tracking-widest opacity-50">
                    <p>Bydgoszcz, PL</p>
                    <p className="mt-2">© 2026 Wojciech Smolarek</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;
