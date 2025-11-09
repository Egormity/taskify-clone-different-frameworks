import { useDraggable } from "@dnd-kit/core";
import { Button } from "@mui/material";

export const BoardListItem = ({ data }: { data: { id: string; name: string } }) => {
	const { listeners, attributes, setNodeRef, transform } = useDraggable({ id: data.id });

	//
	return (
		<Button
			{...listeners}
			{...attributes}
			ref={setNodeRef}
			className="touch-none justify-start! rounded-md bg-white! font-normal! shadow"
			style={{ transform: transform ? `translate(${transform?.x}px, ${transform?.y}px)` : undefined }}
			fullWidth
		>
			{data.name}
		</Button>
	);
};
