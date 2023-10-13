import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
// A great library for fuzzy filtering/sorting items
import {matchSorter} from 'match-sorter';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className="col-auto" >
      <div className="row">
        <label className="col-auto pe-0 col-form-label">Cari : </label>
        <div className="col">
          <input
            id="cari"
            className="ms-0 form-control"
            value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`${count} data...`}
          />
        </div>
      </div>
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, globalFilter, filters },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  )

  // Filter Sesuai Kolom
  // const [filterInput, setFilterInput] = React.useState("");
  const [filterBulan, setFilterBulan] = React.useState("");
  const [filterTahun, setFilterTahun] = React.useState("");
  
  const listTahun = [...new Set(data.map(surat => {
                                  const d = new Date(surat.tanggal_masuk);
                                  return d.getFullYear()
                                }
                                )
                            )
                    ].sort();

  
  // const handleFilterChange = e => {
  //   const value = e.target.value || "";
  //   setFilter("kode_surat", value);
  //   setFilterInput(value);
  // };

  const onChangeBulan = e => {
    const value = e.target.value || "";
    setFilterBulan(value);
    setFilter("Tanggal Masuk", `${value} ${filterTahun}`);
  }

  const onChangeTahun = e => {
    const value = e.target.value || "";
    setFilterTahun(value)
    setFilter("Tanggal Masuk", `${filterBulan} ${value}`);
  }

  return (
    <>
    <div className="row justify-content-between mt-4">
      <div className="col-auto"> 
        <div className="row">
          <label className="col pe-0 col-form-label">Show : </label>
          <div className="col p-0">
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
              className="ms-0 form-select"
            >
              {[5, 10, 15, 20, 25].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/*<input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Cari Kode Surat"}
      />*/}

      <div className="col-auto">

        <div className="row">
          <div className="col-auto" >
            <select className="form-select" onChange={onChangeBulan} defaultValue="">
              <option value="">Semua Bulan</option>
              <option value="Januari">Januari</option>
              <option value="February">February</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
          </div>

          <div className="col-auto" >
            <select className="form-select" onChange={onChangeTahun} defaultValue="">
              <option value="">Semua Tahun</option>

            {
              listTahun.map((row) => {    
                          return (
                          <option key={row} value={row}>
                            {row}
                          </option>
                          )
                      }
              )
            }
            </select>
          </div>
        </div>

      </div>

          
      
      
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
    </div>

            
    <div className="table-responsive">
      <table className="table table-striped table-hover border-dark table-bordered mt-4" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}      
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/*<div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(filters, null, 2)}</code>
        </pre>
      </div>*/}
    </div>

    <div className="d-flex justify-content-between mt-2">

      <div>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
      
      <span>
        Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '50px' }}
        />
      </span>{' '}

      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>

    </div>

  

    </>
  )
}


function TableDataSurat({ columns, dataSurat }) {

  return (
      <Table columns={columns} data={dataSurat} />
      
  )
}

export default TableDataSurat;
