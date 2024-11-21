import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';
import { getJobs } from './api/jobs';
import './App.css';
import Table from './components/table/Table';
import { flattenSubItems, getStatusColour, TableRow } from './helper/helpers';


// 5 minutes in milliseconds
const fiveMinutesStaleTime = 300_000;
const url = process.env.REACT_APP_ALSPEC_URL;  // TODO: use zod

function App() {
  const [query, setQuery] = useState(false);
  

  const columns: Column<TableRow>[] = useMemo(() => {
    return [
      {
        Header: "Jobs",
        columns: [
          {
            id: 'title',
            accessor: (row) => row.isSubItem ? '' : 'title',
            Header: 'Title',
          },
          {
            id: 'description',
            accessor: (row) => row.isSubItem ? '' : 'description',
            Header: 'Description',
          },
          {
            accessor: 'id',
            Header: 'Job ID',
          },
        ]        
      },
      {
        Header: "Sub items",
        columns: [
          {
            Header: 'Item Id',
            accessor: 'subItem.itemId'
          },
          {
            Header: 'Item Title',
            accessor: 'subItem.title'
          },
          {
            Header: 'Item Description',
            accessor: 'subItem.description'
          },
          {
            Header: 'Item Status',
            accessor: 'subItem.status',
            
            Cell: ({value}: CellProps<TableRow>) => {
              const cellColour = getStatusColour(value);
              return <div className="items-center gap-2"> <div className="status" style={{backgroundColor: cellColour}}></div>{value}</div>;
            }
          }
        ],
      }
    ];
  }, []);

  const { data: queriedData = [], isFetching } = useQuery(getJobs(url, { enabled: query, staleTime: fiveMinutesStaleTime }));
  const tableData = flattenSubItems(queriedData);

  return (
    <div className="App">
      <div className="container">
        <button className="fetch-button" disabled={isFetching} onClick={() => setQuery(true)}>
          {isFetching ? <div className="lds-dual-ring" /> : 'Get data'}
        </button>
        <Table<TableRow> columns={columns} data={tableData} />
      </div>
    </div>
  );
}

export default App;
