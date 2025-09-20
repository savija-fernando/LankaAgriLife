import React, { useState, useEffect } from 'react';

const TabToggleBar = ({ activeTab, onTabChange, tabs }) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);

  // Set initial indicator position based on activeTab index
  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.value === activeTab);
    setIndicatorPosition(index);
  }, [activeTab, tabs]);

  // Calculate the width of each tab when the component mounts or when tabs change
  useEffect(() => {
    if (tabs.length > 0) {
      const tabElements = document.querySelectorAll('.tab');
      if (tabElements[0]) {
        setTabWidth(tabElements[0].offsetWidth); // Get the width of the first tab
      }
    }
  }, [tabs]);

  return (
    <div className="relative">
      {/* Tab buttons */}
      <div className="flex justify-center mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            className={`tab px-6 py-2 text-lg font-medium border-b-4 w-full focus:outline-none 
              ${activeTab === tab.value
                ? 'border-green-500 text-green-600' // Active tab style (underline + color change)
                : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'} 
              transition-colors duration-300 ease-in-out`} 
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sliding Indicator (Underline) */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-300 ease-in-out"
        style={{
          width: `${tabWidth}px`, // Set width of the indicator to match the tab width
          transform: `translateX(${indicatorPosition * tabWidth}px)`, // Move indicator based on the active tab's index
        }}
      />
    </div>
  );
};

export { TabToggleBar };
