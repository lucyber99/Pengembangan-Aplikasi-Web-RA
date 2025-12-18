import React, { useState } from 'react';
import './FilterSearch.css';

const FilterSearch = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        type: '', // 'House', 'Apartment', etc.
        location: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'radio') {
            setFilters(prev => ({ ...prev, [name]: value }));
        } else {
            setFilters(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleTypeChange = (selectedType) => {
        setFilters(prev => ({
            ...prev,
            type: prev.type === selectedType ? '' : selectedType
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    const handleReset = () => {
        const resetFilters = {
            name: '',
            minPrice: '',
            maxPrice: '',
            type: '',
            location: '',
        };
        setFilters(resetFilters);
        onFilter(resetFilters);
    }

    return (
        <div className="filter-search">
            <div className="filter-search__header">
                <h3 className="filter-search__title">Filters</h3>
                <button type="button" className="filter-search__reset" onClick={handleReset}>Reset</button>
            </div>

            <form onSubmit={handleSubmit} className="filter-search__form">
                <div className="filter-group">
                    <label htmlFor="name" className="filter-label">Search</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="filter-input"
                        placeholder="Search by property name..."
                        value={filters.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <div className="filter-row">
                        <input
                            type="number"
                            name="minPrice"
                            className="filter-input"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={handleChange}
                        />
                        <span className="filter-separator">-</span>
                        <input
                            type="number"
                            name="maxPrice"
                            className="filter-input"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Property Type</label>
                    <div className="filter-options">
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="type"
                                value="House"
                                checked={filters.type === 'House'}
                                onChange={handleChange}
                            />
                            <span className="filter-option__text">House</span>
                        </label>
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="type"
                                value="Apartment"
                                checked={filters.type === 'Apartment'}
                                onChange={handleChange}
                            />
                            <span className="filter-option__text">Apartment</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <label htmlFor="location" className="filter-label">Location</label>
                    <select
                        name="location"
                        id="location"
                        className="filter-input filter-select"
                        value={filters.location}
                        onChange={handleChange}
                    >
                        <option value="">All Locations</option>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Bali">Bali</option>
                        <option value="Tangerang">Tangerang</option>
                        <option value="Bandung">Bandung</option>
                    </select>
                    {/* Fallback text input if they want free text */}
                    {/* <input ... /> can be added here if select is too restrictive */}
                </div>

                <button type="submit" className="btn primary filter-submit">Apply Filter</button>
            </form>
        </div>
    );
};

export default FilterSearch;
