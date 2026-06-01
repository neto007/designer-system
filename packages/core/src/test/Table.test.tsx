import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Table, useTableSorting } from '../components/primitives/Table'
import type { TableColumn } from '../components/primitives/Table'

interface Row { id: string; name: string; tasks: number }

const DATA: Row[] = [
  { id: '1', name: 'Bravo',  tasks: 50 },
  { id: '2', name: 'Alpha',  tasks: 30 },
  { id: '3', name: 'Charlie', tasks: 70 },
]

const COLUMNS: TableColumn<Row>[] = [
  { id: 'name',  header: 'Name',  cell: (r) => r.name,  sortingField: 'name' },
  { id: 'tasks', header: 'Tasks', cell: (r) => String(r.tasks), sortingField: 'tasks', align: 'right' },
]

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table items={DATA} columns={COLUMNS} trackBy="id" />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
  })

  it('renders all rows', () => {
    render(<Table items={DATA} columns={COLUMNS} trackBy="id" />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Bravo')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('shows empty slot when items is empty', () => {
    render(<Table items={[]} columns={COLUMNS} empty={<span>No data</span>} />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('calls onSortingChange when header is clicked', async () => {
    const handler = vi.fn()
    render(<Table items={DATA} columns={COLUMNS} trackBy="id" onSortingChange={handler} />)
    await userEvent.click(screen.getByText('Name'))
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ direction: 'asc' })
    )
  })

  it('selects a row on checkbox click (multi)', async () => {
    const handler = vi.fn()
    render(
      <Table
        items={DATA}
        columns={COLUMNS}
        trackBy="id"
        selectionType="multi"
        selectedItems={[]}
        onSelectionChange={handler}
      />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    await userEvent.click(checkboxes[1])
    expect(handler).toHaveBeenCalled()
  })

  it('select-all checkbox selects every row', async () => {
    const handler = vi.fn()
    render(
      <Table
        items={DATA}
        columns={COLUMNS}
        trackBy="id"
        selectionType="multi"
        selectedItems={[]}
        onSelectionChange={handler}
      />
    )
    const [selectAll] = screen.getAllByRole('checkbox')
    await userEvent.click(selectAll)
    expect(handler).toHaveBeenCalledWith(DATA)
  })
})

describe('useTableSorting', () => {
  function SortedTable() {
    const { sorting, setSorting, sortedItems } = useTableSorting(DATA)
    return (
      <Table
        items={sortedItems}
        columns={COLUMNS}
        trackBy="id"
        sorting={sorting}
        onSortingChange={setSorting}
      />
    )
  }

  it('sorts ascending on first header click', async () => {
    render(<SortedTable />)
    await userEvent.click(screen.getByText('Name'))
    const cells = screen.getAllByRole('cell')
    expect(cells[0].textContent).toBe('Alpha')
  })

  it('sorts descending on second header click', async () => {
    render(<SortedTable />)
    await userEvent.click(screen.getByText('Name'))
    await userEvent.click(screen.getByText('Name'))
    const cells = screen.getAllByRole('cell')
    expect(cells[0].textContent).toBe('Charlie')
  })
})
