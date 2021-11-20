import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';
import { getCoins } from './api/codegeckoApi';
import './App.css';
import Table from './components/table/Table';

function App() {
  const [query, setQuery] = useState(false);
  const columns: Column<any>[] = useMemo(() => {
    return [
      {
        accessor: 'initials',
        Cell: ({ value }: CellProps<any>) => <div>{value}</div>,
        Header: 'Initials',
      },
    ];
  }, []);

  const data = [{ initials: 'bla' }, { initials: 'blddda' }, { initials: 'bladasdf' }];

  const { data: queriedData, isFetching } = useQuery(getCoins({ enabled: query }));

  return (
    <div className="App">
      <div className="table-container">
        <button onClick={() => setQuery(true)}>Test</button>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;
