import { useState } from "react"
import BTable from "react-bootstrap/Table"
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table"
interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

const PlacesTable = <TData, TValue>({columns,data,}: Props<TData, TValue>) => {
		
	const [sorting, setSorting] = useState<SortingState>([])
	
	const table = useReactTable({
		data,
		columns,
		state: {sorting,},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})
	
    return (
		<BTable striped bordered hover responsive>
			<thead>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<th key={header.id} colSpan={header.colSpan}>
							{header.isPlaceholder ? null : (
								<div
									{...{
										className:
											header.column.getCanSort()
												? "cursor-pointer select-none"
												: "",
										onClick:
											header.column.getToggleSortingHandler(),
									}}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									
									{/* Add a sort direction indiciator */}
									{{
										asc: " ⬇️⬇",
										desc: " ⬆️⬆",
									}[
										header.column.getIsSorted() as string
										] ?? null}
								</div>
							)}
						</th>
					))}
				</tr>
			))}
			</thead>
			
			<tbody>
			{table.getRowModel().rows.map((row) => (
				<tr key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<td key={cell.id}>
							{flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
						</td>
					))}
				</tr>
			))}
			</tbody>
		</BTable>
    ) 
}
    
export default PlacesTable