import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { ButtonMenu } from "@shared/ui/ButtonMenu";

export const CustomTable = <T extends object>({
	data,
	columns,
	actionsProps,
}: {
	data: T[];
	columns: ColumnDef<T, any>[];
	actionsProps?: {
		delete?: {
			onClick: (row: T) => void;
			children?: React.ReactNode;
		};
	};
}) => {
	const columnHelper = createColumnHelper();
	const actionsColumns = actionsProps
		? [
				columnHelper.display({
					id: "ACTIONS",
					header: "",
					cell: cell => (
						<ButtonMenu
							data={Object.entries(actionsProps).map(([key, value]) => ({
								...value,
								onClick: () => value.onClick?.(cell.row.original as T),
								children:
									value.children ||
									(() => {
										switch (key) {
											case "delete":
												return "Delete";
											default:
												return "-";
										}
									})(),
							}))}
						/>
					),
				}),
			]
		: [];
	const columnsFormatted = [...columns, ...actionsColumns];

	//
	const table = useReactTable({
		data,
		columns: columnsFormatted,
		getCoreRowModel: getCoreRowModel(),
	});

	//
	return (
		<>
			<Table>
				<TableHead>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableCell key={header.id} className="text-base!">
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>

				{/*  */}
				<TableBody>
					{table.getRowModel().rows.map(row => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id} className="text-base!">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
