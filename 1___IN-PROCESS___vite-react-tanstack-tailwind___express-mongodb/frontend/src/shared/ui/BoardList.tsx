import { useDraggable } from "@dnd-kit/core";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import { BoardListItemsContainer } from "@shared/ui/BoardListItemsContainer";
import { ButtonMenu } from "@shared/ui/ButtonMenu";

//
export const BoardList = ({
	data,
}: {
	data: { id: string; name: string; items: Array<{ id: string; name: string }> };
}) => {
	const { setNodeRef, transform, listeners, attributes } = useDraggable({
		id: `board-${data.boardId}-list-${data.id}`,
	});

	//
	return (
		<div
			{...listeners}
			{...attributes}
			ref={setNodeRef}
			className="h-fit touch-none space-y-5 rounded-lg bg-stone-100/90 px-3 py-2 shadow-md"
			style={{ transform: transform ? `translate(${transform?.x}px, ${transform?.y}px)` : undefined }}
		>
			<div className="flex items-center justify-between gap-5 pl-3">
				<h5 className="font-semibold">{data.name}</h5>
				<ButtonMenu data={[{ children: "copy" }, { children: "delete" }]} />
			</div>

			{/*  */}
			<BoardListItemsContainer data={data.items} />

			{/*  */}
			<Button className="justify-start! gap-3 text-stone-600!" fullWidth>
				<Add />
				<span>TODO: Add a card</span>
			</Button>
		</div>
	);
};
