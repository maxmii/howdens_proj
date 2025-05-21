import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './Table.css';

const Table = ({ columns, data, loading, error }) => {
  if (loading) {
    return <div className="table-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="table-error">Error loading data: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">No data available</div>;
  }

  return (
    <div className="table-container">
      <table>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} data={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
