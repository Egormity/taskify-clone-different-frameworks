import { useDroppable } from "@dnd-kit/core";

import { BoardListItem } from "@/ui";

//
export const BoardListItemsContainer = ({ data }: { data: Array<{ id: string; name: string }> }) => {
	const { setNodeRef } = useDroppable({ id: "" });

	//
	return (
		<div ref={setNodeRef} className="flex flex-col gap-3">
			{data.map(item => (
				<BoardListItem key={item.id} data={item} />
			))}
		</div>
	);
};
