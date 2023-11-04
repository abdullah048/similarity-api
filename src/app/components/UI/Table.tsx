'use client';

import { FC } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ApiRequest } from '@prisma/client';
import { useTheme } from 'next-themes';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type ModifiedRequestType<T extends keyof ApiRequest> = Omit<ApiRequest, T> & {
  timestamp: string;
};

interface TableProps {
  userRequests: ModifiedRequestType<'timestamp'>[];
}

const columns: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'API Key used',
    flex: 1,
    minWidth: 150,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  {
    field: 'col2',
    headerName: 'Path',
    flex: 1,
    minWidth: 150,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col3',
    headerName: 'Recency',
    flex: 1,
    minWidth: 100,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col4',
    headerName: 'Duration',
    flex: 1,
    minWidth: 100,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
  {
    field: 'col5',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
    renderHeader(params) {
      return (
        <strong className='font-semibold'>{params.colDef.headerName}</strong>
      );
    },
  },
];

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme();

  const theme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    },
  });

  const rows = userRequests.map(req => ({
    id: req.id,
    col1: req.usedApiKey,
    col2: req.path,
    col3: `${req.timestamp} ago`,
    col4: `${req.duration} ms`,
    col5: req.status,
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
          fontSize: '1rem',
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows || []}
      />
    </ThemeProvider>
  );
};

export default Table;
