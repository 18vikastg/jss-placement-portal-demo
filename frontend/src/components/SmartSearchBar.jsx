import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Building2, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { TECH_ROLES, COMPANIES } from '@/utils/constants';

const SmartSearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);

    useEffect(() => {
        if (query.length > 1) {
            const roleSuggestions = TECH_ROLES
                .filter(role => 
                    role.title.toLowerCase().includes(query.toLowerCase()) ||
                    role.category.toLowerCase().includes(query.toLowerCase()) ||
                    role.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
                )
                .map(role => ({
                    type: 'role',
                    id: role.id,
                    title: role.title,
                    subtitle: `${role.category} • ${role.level}`,
                    icon: role.icon,
                    data: role
                }));

            const companySuggestions = COMPANIES
                .filter(company => 
                    company.name.toLowerCase().includes(query.toLowerCase()) ||
                    company.industry.toLowerCase().includes(query.toLowerCase()) ||
                    company.location.toLowerCase().includes(query.toLowerCase())
                )
                .map(company => ({
                    type: 'company',
                    id: company.id,
                    title: company.name,
                    subtitle: `${company.industry} • ${company.location}`,
                    icon: '🏢',
                    data: company
                }));

            setSuggestions([...roleSuggestions.slice(0, 4), ...companySuggestions.slice(0, 4)]);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query]);

    const handleSearch = (searchQuery = query) => {
        onSearch(searchQuery);
        setShowSuggestions(false);
        setQuery('');
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.type === 'role') {
            handleSearch(suggestion.title);
        } else {
            handleSearch(suggestion.data.name);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
            <div className="flex w-full shadow-2xl bg-white rounded-2xl p-2 border border-gray-100">
                <input
                    type="text"
                    placeholder="Search roles, companies, or skills..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length > 1 && setShowSuggestions(true)}
                    className="flex-1 outline-none border-none px-6 py-4 text-lg rounded-l-2xl"
                />
                <Button 
                    onClick={() => handleSearch()}
                    className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 rounded-xl text-white font-semibold"
                >
                    <Search className='h-5 w-5 mr-2' />
                    Search
                </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-3">
                        <div className="text-sm text-gray-500 mb-2 font-medium">Suggestions</div>
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={`${suggestion.type}-${suggestion.id}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                    index === selectedIndex 
                                        ? 'bg-red-50 border border-red-200' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="text-2xl">{suggestion.icon}</div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{suggestion.title}</div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        {suggestion.type === 'role' ? (
                                            <>
                                                <TrendingUp className="w-3 h-3" />
                                                {suggestion.subtitle}
                                            </>
                                        ) : (
                                            <>
                                                <Building2 className="w-3 h-3" />
                                                {suggestion.subtitle}
                                            </>
                                        )}
                                    </div>
                                </div>
                                {suggestion.type === 'company' && (
                                    <div className="text-xs text-red-600 font-medium">
                                        {suggestion.data.openPositions} jobs
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SmartSearchBar;
