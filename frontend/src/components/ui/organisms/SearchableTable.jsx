import React, { useState, useMemo } from "react";
import DataTable from "../organisms/DataTable"
import useDebounce from "../../../hooks/useDebounce"
import SearchBar from "../molecules/SearchBar"

const SearchableTable = ({
  localData,
  columns,
  searchKey,
  placeholder,
  onRowClick,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounced = useDebounce(searchTerm, 300);
  const filtered = useMemo(() => {
    if (!debounced) return localData;
    return localData.filter((row) => {
      const cell = row[searchKey];
      return String(cell).toLowerCase().includes(debounced.toLowerCase());
    });
  }, [localData, debounced, searchKey]);

  return (
    <div className={className}>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
      />

      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default SearchableTable;
