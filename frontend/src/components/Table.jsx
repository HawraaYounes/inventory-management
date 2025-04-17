import React from "react";

const Table = ({ columns, data, onEdit, onRemove, onRowClick }) => {
  return (
    <div className="overflow-x-auto font-poppins rounded-md ">
      <table className="min-w-full border border-[#e7e7e7] rounded-md ">
        <thead className="bg-[#dbdbdb] text-[#464646] ">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 text-left border-b border-b-[#e7e7e7] font-light">{col.label}</th>
            ))}
            <th className="py-3 px-4 text-left border-b border-b-[#e7e7e7] font-light">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[#74828F]">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-b-[#e7e7e7] hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="py-3 px-4 flex gap-2">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(row);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(row);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
