import React from 'react';

const MarketplacePreview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="400" height="225" rx="8" fill="#111111" />
      
      {/* Header Bar */}
      <rect width="400" height="40" fill="#1E2733" />
      <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="600" fill="white">
        Platform One Solutions Marketplace
      </text>
      
      {/* Logo placeholder */}
      <circle cx="370" cy="20" r="15" fill="#F45B41" />
      <text x="364" y="25" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="white">P1</text>
      
      {/* Search Bar */}
      <rect x="20" y="60" width="360" height="40" rx="4" fill="#232B36" />
      <text x="40" y="84" fontFamily="Arial, sans-serif" fontSize="14" fill="#8C9BAE">
        Search for solutions...
      </text>
      <circle cx="360" cy="80" r="12" fill="#373F4A" />
      <path d="M356 76L364 84M364 76L356 84" stroke="white" strokeWidth="1.5" />
      
      {/* Solution Cards */}
      <g>
        {/* Card 1 - DevSecOps Solution */}
        <rect x="20" y="120" width="115" height="90" rx="4" fill="#262F39" />
        <rect x="20" y="120" width="115" height="60" rx="4" fill="#323B47" />
        
        {/* Network diagram in card 1 */}
        <circle cx="57" cy="140" r="5" fill="#F45B41" />
        <circle cx="77" cy="155" r="5" fill="#F45B41" />
        <circle cx="97" cy="135" r="5" fill="#F45B41" />
        <line x1="57" y1="140" x2="77" y2="155" stroke="#F45B41" strokeWidth="1.5" />
        <line x1="77" y1="155" x2="97" y2="135" stroke="#F45B41" strokeWidth="1.5" />
        <line x1="97" y1="135" x2="57" y2="140" stroke="#F45B41" strokeWidth="1.5" />
        
        <text x="30" y="195" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="white">
          DevSecOps Solution
        </text>
        <text x="30" y="208" fontFamily="Arial, sans-serif" fontSize="10" fill="#8C9BAE">
          Radius Method
        </text>
        <text x="30" y="222" fontFamily="Arial, sans-serif" fontSize="10" fill="#F45B41">
          View Details →
        </text>
      </g>
      
      <g>
        {/* Card 2 - Zero Trust Access */}
        <rect x="145" y="120" width="115" height="90" rx="4" fill="#262F39" />
        <rect x="145" y="120" width="115" height="60" rx="4" fill="#323B47" />
        
        {/* Shield icon in card 2 */}
        <path 
          d="M200,135 L185,140 L185,155 C185,162 191,168 200,175 C209,168 215,162 215,155 L215,140 L200,135 Z" 
          fill="#3F90DE" 
        />
        <path 
          d="M193,155 L198,160 L207,151" 
          stroke="white" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <text x="155" y="195" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="white">
          Zero Trust Access
        </text>
        <text x="155" y="208" fontFamily="Arial, sans-serif" fontSize="10" fill="#8C9BAE">
          Vendor Name
        </text>
        <text x="155" y="222" fontFamily="Arial, sans-serif" fontSize="10" fill="#3F90DE">
          View Details →
        </text>
      </g>
      
      <g>
        {/* Card 3 - Secure Containers */}
        <rect x="270" y="120" width="115" height="90" rx="4" fill="#262F39" />
        <rect x="270" y="120" width="115" height="60" rx="4" fill="#323B47" />
        
        {/* Container grid in card 3 */}
        <rect x="292" y="135" width="22" height="22" fill="#4CD964" />
        <rect x="322" y="135" width="22" height="22" fill="#4CD964" />
        <rect x="292" y="157" width="22" height="22" fill="#4CD964" />
        <rect x="322" y="157" width="22" height="22" fill="#4CD964" />
        
        <text x="280" y="195" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600" fill="white">
          Secure Containers
        </text>
        <text x="280" y="208" fontFamily="Arial, sans-serif" fontSize="10" fill="#8C9BAE">
          Vendor Name
        </text>
        <text x="280" y="222" fontFamily="Arial, sans-serif" fontSize="10" fill="#4CD964">
          View Details →
        </text>
      </g>
    </svg>
  );
};

export default MarketplacePreview; 