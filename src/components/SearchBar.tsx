import React, { useState, useRef, useEffect } from 'react';
import { SearchResult } from '../types/weather';
import weatherService from '../services/weatherService';
import { debounce } from '../utils';
import './SearchBar.css';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, onCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 防抖搜索
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await weatherService.searchCities(searchQuery);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('搜索失败:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLocationSelect = (result: SearchResult) => {
    setQuery(result.name);
    setShowResults(false);
    onLocationSelect(result.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      onLocationSelect(query.trim());
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="搜索城市..."
            className="search-input"
            onFocus={() => results.length > 0 && setShowResults(true)}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
          <button
            type="button"
            onClick={onCurrentLocation}
            className="location-button"
            title="使用当前位置"
          >
            📍
          </button>
        </div>
        
        {showResults && (
          <div className="search-results">
            {isLoading ? (
              <div className="search-result-item loading">搜索中...</div>
            ) : results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleLocationSelect(result)}
                >
                  <div className="result-name">{result.name}</div>
                  <div className="result-region">{result.region}, {result.country}</div>
                </div>
              ))
            ) : (
              <div className="search-result-item no-results">未找到匹配的城市</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;