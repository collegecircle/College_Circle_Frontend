// import React from 'react';

// const FilterButtons = ({ filters, activeFilter, onFilterChange, theme = 'blue' }) => {
//     const getHoverColors = () => {
//         switch (theme) {
//             case 'yellow':
//                 return 'hover:bg-yellow-400 hover:text-black hover:border-yellow-400';
//             case 'green':
//                 return 'hover:bg-yellow-400 hover:text-black hover:border-yellow-400';
//             case 'blue':
//             default:
//                 return 'hover:bg-yellow-400 hover:text-black hover:border-yellow-400';
//         }
//     };

//     const getActiveColors = () => {
//         switch (theme) {
//             case 'yellow':
//                 return 'bg-yellow-400 text-black border-yellow-400';
//             case 'green':
//                 return 'bg-yellow-400 text-black border-green-400';
//             case 'blue':
//             default:
//                 return 'bg-yellow-400 text-black border-blue-400';
//         }
//     };

//     return (
//         <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {filters.map((filter) => (
//                 <button
//                     key={filter}
//                     onClick={() => onFilterChange(filter)}
//                     className={`px-4 sm:px-6 py-2 rounded-full border-black transition-all duration-300 text-sm sm:text-base ${activeFilter === filter
//                         ? getActiveColors()
//                         : `border-black-600 text-gray-300 ${getHoverColors()}`
//                         }`}
//                 >
//                     {filter}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default FilterButtons;




import React from 'react';

const FilterDropdown = ({ filters, activeFilter, onFilterChange, theme = 'white' }) => {
    const getBorderColor = () => {
        switch (theme) {
            case 'yellow':
                return 'border-yellow-400 text-yellow-700';
            case 'green':
                return 'border-green-400 text-green-700';
            case 'white':
                return 'border-white text-white bg-gray-800';
            case 'black':
            default:
                return 'border-gray-400 text-gray-700';
        }
    };

    return (
        <div className="flex justify-center mb-8">
            <select
                value={activeFilter}
                onChange={(e) => onFilterChange(e.target.value)}
                className={`px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base ${getBorderColor()}`}
            >
                <option value="">Select...</option>
                {filters.map((filter) => (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
