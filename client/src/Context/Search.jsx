import { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState({
        keyword:"all",
        results:[], 
        page: 1
    });

    useEffect(() => {
        // Perform search logic here
        // You can use the searchQuery state to make API requests or perform any other search-related operations
    }, [searchQuery]);

    return (
        <SearchContext.Provider value={[searchQuery, setSearchQuery]}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
