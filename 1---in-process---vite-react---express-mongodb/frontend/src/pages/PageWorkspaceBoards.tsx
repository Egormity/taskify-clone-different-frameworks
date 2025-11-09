import { Add, HelpOutline, Person2Outlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { ButtonPopover } from "@/ui";

import { FormBoardCreateEdit } from "@/widgets";

const MOCK_BOARDS = {
	tooltip: "TODO: Tooltip",
	boardsRemaining: "N",
	data: [
		{ id: "1", name: "Board 1", workspaceId: "1" },
		{ id: "2", name: "Board 2", workspaceId: "2" },
		{ id: "3", name: "Board 3", workspaceId: "3" },
	],
};

export const PageWorkspaceBoards = () => {
	const navigate = useNavigate();

	//
	return (
		<div>
			<h1 className="flex items-center gap-2 text-2xl">
				<Person2Outlined sx={{ fontSize: 40 }} />
				<span>Your boards</span>
			</h1>

			{/*  */}
			<div className="mt-6 flex flex-wrap gap-4">
				{MOCK_BOARDS.data.map(item => (
					<Button
						key={item.id}
						className="relative h-36 w-64 overflow-hidden rounded-lg"
						onClick={() =>
							navigate({
								to: "/workspaces/$workspaceId/boards/$boardId",
								params: { workspaceId: item.workspaceId, boardId: item.id },
							})
						}
					>
						<div className="absolute top-0 left-0 h-full w-full bg-black/50" />
						<h3 className="absolute top-2 left-3 z-10 text-lg font-normal text-white">{item.name}</h3>
					</Button>
				))}

				{/*  */}
				<ButtonPopover
					buttonProps={{
						className:
							"relative flex h-36 w-64 flex-col items-center justify-center overflow-hidden rounded-lg text-center",
						children: (
							<>
								<div className="absolute top-0 left-0 h-full w-full bg-black/10" />
								<Add sx={{ fontSize: 32 }} className="absolute top-1.5 left-2 text-stone-500" />
								<h3 className="text-lg font-bold">Create new board</h3>
								<h5 className="font-semibold">{MOCK_BOARDS.boardsRemaining} remaining</h5>
								<Tooltip
									title={MOCK_BOARDS.tooltip}
									className="absolute right-3 bottom-3 z-10 text-stone-500"
									onClick={e => e.stopPropagation()}
								>
									<HelpOutline sx={{ fontSize: 20 }} />
								</Tooltip>
							</>
						),
					}}
					popoverProps={{ children: <FormBoardCreateEdit /> }}
				/>
			</div>
		</div>
	);
};
