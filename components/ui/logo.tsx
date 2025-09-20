'use client'

interface LogoProps {
  size?: number
  className?: string
}

export default function HuddleLogo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimalist Huddle Logo - Circle of people connecting */}
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
      
      {/* Three connected dots representing people in a huddle */}
      <circle cx="16" cy="8" r="2.5" fill="currentColor"/>
      <circle cx="10" cy="20" r="2.5" fill="currentColor"/>
      <circle cx="22" cy="20" r="2.5" fill="currentColor"/>
      
      {/* Connection lines */}
      <line x1="16" y1="10.5" x2="12" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="10.5" x2="20" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12.5" y1="20" x2="19.5" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
