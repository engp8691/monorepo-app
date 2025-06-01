'use client'

import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  ModuleRegistry,
  PaginationModule,
  ValidationModule,
} from 'ag-grid-community'
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  ServerSideRowModelModule,
} from 'ag-grid-enterprise'
import { FakeServer } from '../common/fakeServer'
import { IOlympicDataWithId } from '../common/interfaces'
ModuleRegistry.registerModules([
  PaginationModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  ServerSideRowModelModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
])

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any,
) => {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request)
      const response = server.getData(params.request)
      // adding delay to simulate real server call
      setTimeout(() => {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 200)
    },
  }
}

export const GridPaging = () => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'id', maxWidth: 75 },
    { field: 'athlete', minWidth: 190 },
    { field: 'age' },
    { field: 'year' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ])
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
    }
  }, [])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicDataWithId[]) => {
        // add id to data
        let idSequence = 1
        data.forEach(function (item: any) {
          item.id = idSequence++
        })
        // setup the fake server with entire dataset
        const fakeServer = FakeServer(data)
        // create datasource with a reference to the fake server
        const datasource = getServerSideDatasource(fakeServer)
        // register the datasource with the grid
        params.api.setGridOption('serverSideDatasource', datasource)
      })
  }, [])

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
      <AgGridReact<IOlympicDataWithId>
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowModelType={'serverSide'}
        pagination={true}
        paginationPageSize={20}
        cacheBlockSize={10}
        onGridReady={onGridReady}
      />
    </div>
  )
}
