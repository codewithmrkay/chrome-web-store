import React from 'react';
import { Star } from 'lucide-react';

export const GlobalShortcutItem = ({ shortcut }) => {

    const handleStarClick = (e) => {
        e.preventDefault(); // Prevent navigation if wrapped in link
    };

    const handleCardClick = () => {
        window.open(shortcut.url, '_blank', 'noopener,noreferrer');
    };

    // Get favicon from URL
    const getFaviconUrl = (url, title = "U") => {
        try {
            const domain = new URL(url).hostname;
            // DuckDuckGo is often more reliable for modern sites
            return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        } catch {
            return `https://via.placeholder.com/64?text=${title.charAt(0).toUpperCase()}`;
        }
    };

    return (
        <div className='flex items-center justify-center p-2 py-4 bg-base-200 rounded-xl'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <div className='w-15 h-15'>
                    <img className='rounded-xl bg-white w-full h-full object-cover object-center' src={getFaviconUrl(shortcut.url)} alt={shortcut.title} />
                </div>
                <div>
                    <h1>{shortcut.title}</h1>
                </div>
                <div className='flex items-center justify-center gap-1'>
                    <span>⭐</span>
                    <button className='btn btn-primary btn-xs'>ADD</button>
                </div>
            </div>
        </div>
    );
};