import React from 'react';
import { DeleteShortcutModal } from '../modals/DeleteShortcutModal';

export const UserShortcutItem = ({ shortcut }) => {
    const handleCardClick = () => {
        window.open(shortcut.url, '_blank', 'noopener,noreferrer');
    };

    const getFaviconUrl = (url, title = "U") => {
        try {
            const domain = new URL(url).hostname;
            return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        } catch {
            return `https://via.placeholder.com/64?text=${title.charAt(0).toUpperCase()}`;
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className='shadow-xl shadow-black flex items-center justify-center py-4 bg-base-100 rounded-xl'
        >
            <div className='cursor-pointer flex flex-col items-center justify-center gap-3'>
                <div className='p-4 bg-base-300 rounded-xl'>
                    <div>
                        <img
                            className='rounded-full p-2 bg-white w-15 h-15 object-cover object-center'
                            src={getFaviconUrl(shortcut.url, shortcut.title)}
                            alt={shortcut.title}
                        />
                    </div>
                </div>
                <div>
                    <h1 className='text-center line-clamp-1'>{shortcut.title}</h1>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className='flex items-center justify-center gap-3'>
                    <span>⭐{shortcut.starCount || 0}</span>
                    <DeleteShortcutModal
                        shortcutId={shortcut._id}
                        shortcutTitle={shortcut.title}
                    />
                </div>
            </div>
        </div>
    );
};