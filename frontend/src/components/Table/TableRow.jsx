import React from 'react';

const TableRow = ({ data, columns }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className={column.className || ''}>
          {column.render ? column.render(data) : data[column.key]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
