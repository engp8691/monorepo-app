'use client'

import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  ColTypeDef,
  GridReadyEvent,
  IServerSideDatasource,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
  CellStyleModule,
  PaginationModule,
  RowStyleModule,
} from 'ag-grid-community'
import {
  ColumnMenuModule,
  ContextMenuModule,
  ServerSideRowModelModule,
} from 'ag-grid-enterprise'
import { IOlympicData } from '../common/interfaces'
import { FakeServer } from '../common/fakeServer'
import GoldCellRenderer from '../common/GoldCellRenderer'
ModuleRegistry.registerModules([
  ColumnMenuModule,
  ContextMenuModule,
  ServerSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  CellStyleModule,
  PaginationModule,
  RowStyleModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
])

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any,
) => {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request)
      // get data for request from our fake server
      const response = server.getData(params.request)
      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          })
        } else {
          params.fail()
        }
      }, 500)
    },
  }
}

const getRowStyle = (params: any) => {
  if (params?.data?.gold + params?.data?.silver + params?.data?.bronze > 4) {
    return { backgroundColor: '#e3f1f2' }
  }
  return undefined
}

const GridFiltering = () => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'id', maxWidth: 75 },
    {
      field: 'athlete',
      filter: 'agTextColumnFilter',
      cellStyle: params => {
        if (/^Li /i.test(params.value)) {
          return { color: 'red' }
        }
        return null
      },
      minWidth: 220,
    },
    {
      field: 'year',
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['reset'],
        debounceMs: 1000,
        maxNumConditions: 1,
      },
    },
    { field: 'gold', type: 'number', cellRenderer: GoldCellRenderer },
    { field: 'silver', type: 'number' },
    { field: 'bronze', type: 'number' },
  ])
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    }
  }, [])
  const columnTypes = useMemo<{
    [key: string]: ColTypeDef;
  }>(() => {
    return {
      number: { filter: 'agNumberColumnFilter' },
    }
  }, [])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => {
        let idSequence = 1
        data.forEach(function (item: any) {
          item.id = idSequence++
        })
        // setup the fake server with entire dataset
        const fakeServer = FakeServer(data)
        // create datasource with a reference to the fake server
        const datasource = getServerSideDatasource(fakeServer)
        // register the datasource with the grid
        setTimeout(() => params.api.setGridOption('serverSideDatasource', datasource), 0)
      })
  }, [])

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
      <AgGridReact<IOlympicData>
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        columnTypes={columnTypes}
        rowModelType={'serverSide'}
        pagination={true}
        paginationPageSize={20}
        cacheBlockSize={10}
        getRowStyle={getRowStyle}
        onGridReady={onGridReady}
      />
    </div >
  )
}

export default GridFiltering