import { DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import { BoardList, ButtonMenu } from "@/ui";

const MOCK_DATA = {
	data: [
		{
			id: "1",
			name: "1",
			items: [
				{
					id: "1",
					name: "1",
				},
				{
					id: "2",
					name: "2",
				},
			],
		},
		{
			id: "2",
			name: "2",
			items: [
				{
					id: "1",
					name: "1",
				},
				{
					id: "2",
					name: "2",
				},
				{
					id: "3",
					name: "3",
				},
				{
					id: "4",
					name: "5",
				},
			],
		},
		{
			id: "3",
			name: "3",
			items: [
				{
					id: "1",
					name: "1",
				},
			],
		},
	],
};

//
export const Board = () => {
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5, // Minimum 5px movement required
			},
		}),
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5, // Minimum 5px movement required
			},
		}),
	);

	//
	return (
		<DndContext sensors={sensors} onDragEnd={console.log}>
			<div className="relative -mx-5 h-full lg:-mx-20 2xl:-mx-40">
				<div className="absolute top-0 left-0 z-1 h-full w-full bg-amber-700" />

				{/*  */}
				<div className="relative z-2 max-h-[calc(100vh-64px)] overflow-auto">
					<div className="flex h-16 items-center justify-between bg-black/25 p-5 lg:px-20 2xl:px-40">
						<h1 className="text-2xl font-bold text-white">Name</h1>
						<ButtonMenu iconProps={{ className: "text-white" }} />
					</div>

					{/*  */}
					<div
						className="grid gap-5 p-5 lg:px-20 2xl:px-40"
						style={{ gridTemplateColumns: `repeat(${MOCK_DATA.data.length + 1}, 1fr)` }}
					>
						{MOCK_DATA.data.map(item => (
							<BoardList key={item.id} data={item} />
						))}
						<Button className="h-fit justify-start! gap-3 bg-stone-200/90! text-black!" variant="contained">
							<Add />
							<span>Add a list</span>
						</Button>
					</div>
				</div>
			</div>
		</DndContext>
	);
};
