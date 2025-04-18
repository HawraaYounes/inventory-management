import React, { useState, useMemo } from "react";
import DataTable from "./DataTable";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../molecules/SearchBar";

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
  // filter the data by the given key
  const filtered = useMemo(() => {
    if (!debounced) return localData;
    return localData.filter((row) => {
      const cell = row[searchKey];
      console.log("Checking row:", row, " | Cell:", cell); // 👈 DEBUG THIS
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
