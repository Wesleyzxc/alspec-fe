import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';
import { CoinDTO, getCoins } from './api/codegeckoApi';
import './App.css';
import Table from './components/table/Table';

function App() {
  const [query, setQuery] = useState(false);

  const columns: Column<CoinDTO>[] = useMemo(() => {
    return [
      {
        accessor: 'image',
        Cell: ({ value }: CellProps<CoinDTO>) => <img height={50} src={value} alt="coin" />,
        Header: 'Image',
        disableSortBy: true,
      },
      {
        accessor: 'symbol',
        Header: 'Symbol',
      },
      {
        accessor: 'name',
        Header: 'Name',
      },
      {
        accessor: 'market_cap',
        Header: 'Market Cap',
      },
      {
        accessor: 'current_price',
        Header: 'Current Price (AUD)',
      },
    ];
  }, []);

  // 5 minutes
  const fiveMinutesStaleTime = 300000;

  const { data: queriedData = [], isFetching } = useQuery(getCoins({ enabled: query, staleTime: fiveMinutesStaleTime }));

  return (
    <div className="App">
      <div className="container">
        <button className="fetch-button" disabled={isFetching} onClick={() => setQuery(true)}>
          {isFetching ? <div className="lds-dual-ring" /> : 'Get Coins'}
        </button>
        <Table<CoinDTO> columns={columns} data={queriedData} />
      </div>
    </div>
  );
}

export default App;
