import React from 'react';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-dark-card border-b border-gray-800">
            <div className="flex items-center gap-2">
                <Music className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-white tracking-tight">MoodyPlayer</h1>
            </div>

            <div>
                <span className="text-xs text-gray-400 border border-gray-700 rounded-full px-3 py-1">
                    YouTube Integrated
                </span>
            </div>
        </header>
    );
};

export default Header;
