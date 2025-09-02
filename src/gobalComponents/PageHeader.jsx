import React from 'react';

const PageHeader = ({
    title,
    highlightedWord,
    highlightColor = 'yellow-400',
    underlineColor = 'yellow-400',
    description,
    textColor = 'gray-300'
}) => {
    return (
        <div className="pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                    {title} <span className={`text-${highlightColor}`}>{highlightedWord}</span>
                </h1>
                <div className={`w-30 h-1 mx-auto bg-${underlineColor} rounded-full mb-6`}></div>
                <p className={`text-lg sm:text-xl text-${textColor} max-w-2xl mx-auto mb-8`}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default PageHeader;