import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="280"
        height="40"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EliteJet Care Logo"
        {...props}
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#27AE60', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#2ECC71', stopOpacity: 1 }} />
            </linearGradient>
        </defs>

        {/* Icon part - Dynamic Wing */}
        <g>
            <path
                d="M5 20 C15 10, 25 10, 35 20 S45 30, 55 20"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
            />
             <path
                d="M5 25 C15 15, 25 15, 35 25 S45 35, 55 25"
                stroke="url(#logoGradient)"
                strokeOpacity="0.6"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
            />
        </g>
        
        {/* Text part - Default to white for dark theme */}
        <text
            x="65"
            y="28"
            fontFamily="Roboto Condensed, sans-serif"
            fontWeight="700"
            fontSize="24"
            letterSpacing="0.02em"
            fill={props.style?.['--color-primary' as any] || 'white'}
        >
            EliteJet
        </text>
        <text
            x="155"
            y="28"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            fontSize="24"
            fill="url(#logoGradient)"
        >
            Care
        </text>
    </svg>
);