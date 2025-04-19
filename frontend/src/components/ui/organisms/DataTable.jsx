import React from "react";

const DataTable = ({ columns, data, onRowClick, className = "" }) => {
  return (
    <div className={`overflow-x-auto font-poppins rounded-md ${className}`}>
      <table className="min-w-full border border-[#e7e7e7] rounded-md">
        <thead className="bg-[#dbdbdb] text-[#464646]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-4 text-left border-b border-b-[#e7e7e7] font-light"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#74828F]">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-b-[#e7e7e7] hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DataTable;
