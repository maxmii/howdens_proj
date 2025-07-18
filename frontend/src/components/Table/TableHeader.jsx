import React from 'react';

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>{column.header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
