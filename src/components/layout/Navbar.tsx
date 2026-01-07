import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemedButton } from '../common/ThemedButton'

interface NavItem {
  label: string
  href: string
  type?: 'anchor' | 'route'
}

interface NavbarProps {
  visible?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Industries', href: '#industries', type: 'anchor' },
  { label: 'Products', href: '#products', type: 'anchor' },
  { label: 'Blog', href: '#blog', type: 'anchor' },
  { label: 'Contact Us', href: '#contact', type: 'anchor' },
  { label: 'About Us', href: '/about', type: 'route' }
]

const ACTIVE_ITEM = 'Home'

const Navbar: React.FC<NavbarProps> = ({ visible = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(ACTIVE_ITEM)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.label)
    setIsMenuOpen(false)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveItem(item.label)
    setIsMenuOpen(false)

    if (location.pathname !== '/') {
      window.location.assign(`/${item.href}`)
    } else {
      const targetId = item.href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleGetDemoClick = () => {
    console.info('Get a demo CTA triggered')
  }

  useEffect(() => {
    const updateActiveItem = () => {
      if (location.pathname === '/about') {
        setActiveItem('About Us')
        return
      }

      if (location.pathname === '/') {
        const currentItem = NAV_ITEMS.find((item) => item.label === activeItem)
        if (!currentItem || currentItem.type === 'route') {
          setActiveItem('Home')
        }
      }
    }

    updateActiveItem()
  }, [location.pathname])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-2 left-2 right-2 z-50 h-16 sm:h-20 md:top-3 md:left-3 md:right-3 lg:top-[11px] lg:left-[3px] lg:right-[3px] lg:h-[85px] transition-all duration-700 ease-out bg-[FFFFFFF0] backdrop-blur-[20px] rounded-xl md:rounded-2xl lg:rounded-[18px] ${
        visible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="flex h-full w-full items-center justify-between px-4 mx-auto sm:px-6 md:px-8 lg:px-20">
        <a
          href="/"
          className="flex items-center gap-2 text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#96B5F1]"
          aria-label="Aadrila Technologies home"
        >
          <img
            src="/logo.png"
            alt="Aadrila Technologies logo"
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-[48px] object-contain"
            draggable={false}
            loading="lazy"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium tracking-[0.15em] font-raleway text-black">AADRILA</span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.46em] font-raleway text-black">TECHNOLOGIES</span>
          </span>
        </a>

        <div className="hidden md:flex h-full items-center">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] text-sm sm:text-base md:text-base leading-4 font-normal tracking-[0.02em] font-manrope text-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label
              const linkClasses = `inline-flex h-full items-center pt-[2px] transition-colors duration-150 ${
                isActive ? 'text-hero-title' : 'hover:text-hero-title'
              } ${isActive ? 'font-medium' : 'font-normal'}`

              return (
                <li key={item.label} className="relative border-none">
                  {item.type === 'route' ? (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item)}
                      className={linkClasses}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden md:flex items-center">
          <ThemedButton onClick={handleGetDemoClick} className="text-sm sm:text-base">
            Get a Demo
          </ThemedButton>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#96B5F1]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-center items-center">
            <span
              className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </div>
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-white/50 bg-white/95 backdrop-blur-[20px] transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-1 px-4 sm:px-6 py-4 text-[14px] sm:text-[16px] font-medium font-manrope text-body">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label
            const mobileClasses = `flex items-center rounded-[12px] px-3 py-2 transition-colors duration-150 text-foreground ${
              isActive
                ? 'bg-hero-title/10 text-hero-title'
                : 'hover:bg-hero-title/5 hover:text-hero-title'
            }`

            if (item.type === 'route') {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={mobileClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item)}
                className={mobileClasses}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}

          <ThemedButton onClick={handleGetDemoClick} className="mt-4 w-full text-sm sm:text-base">
            Get a Demo
          </ThemedButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar