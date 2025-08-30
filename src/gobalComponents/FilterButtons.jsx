import React from 'react';

const FilterButtons = ({ filters, activeFilter, onFilterChange, theme = 'blue' }) => {
    const getHoverColors = () => {
        switch (theme) {
            case 'yellow':
                return 'hover:bg-yellow-400 hover:text-black hover:border-yellow-400';
            case 'green':
                return 'hover:bg-green-400 hover:text-black hover:border-green-400';
            case 'blue':
            default:
                return 'hover:bg-blue-400 hover:text-black hover:border-blue-400';
        }
    };

    const getActiveColors = () => {
        switch (theme) {
            case 'yellow':
                return 'bg-yellow-400 text-black border-yellow-400';
            case 'green':
                return 'bg-green-400 text-black border-green-400';
            case 'blue':
            default:
                return 'bg-blue-400 text-black border-blue-400';
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
                <button 
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-4 sm:px-6 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                        activeFilter === filter 
                            ? getActiveColors()
                            : `border-gray-600 text-gray-300 ${getHoverColors()}`
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;