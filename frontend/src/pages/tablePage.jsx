import {useState, useEffect} from 'react';
import getTableData from '../services/getTables';
import {Table} from '../components/Table';

const TablePage = () => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleAll, setToggleAll] = useState(false);

  const columns = [
    {key: 'Name', header: 'Name'},
    {key: 'WorkflowType', header: 'Workflow Type'},
    {key: 'User', header: 'User'},
    {key: 'StartTime', header: 'Start Time'},
    {
      key: 'Duration',
      header: 'Duration',
      render: (data) =>
        data.Duration > 0 ? `${data.Duration} Seconds` : 'Not Finished',
    },
    {key: 'Progress', header: 'Progress'},
    {key: 'Status', header: 'Status'},
    {
      key: 'Result',
      header: 'Details',
      className: 'details-cell',
      render: (data) => {
        if (data.Result) {
          return (
            <div className="download-container">
              <a href={data.Result} download className="download-button">
                Download
              </a>
            </div>
          );
        } else if (data.Error) {
          return <div className="error-message">Error: {data.Error}</div>;
        } else {
          return <span>No data</span>;
        }
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const tableData = await getTableData(toggleAll);
        setTable(tableData);
        setError(null);
      } catch (err) {
        setError('Failed to load table data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [toggleAll]);

  const handleToggle = () => setToggleAll(!toggleAll);

  return (
    <div>
      <div className="toggle-container">
        <span className="toggle-label">Filter:</span>
        <label className="toggle-switch">
          <input type="checkbox" checked={toggleAll} onChange={handleToggle} />
          <span className="toggle-slider"></span>
        </label>
        <div className="toggle-text">
          <span>{toggleAll ? 'User' : 'All'}</span>
        </div>
      </div>
      <Table columns={columns} data={table} loading={loading} error={error} />
    </div>
  );
};

export default TablePage;
