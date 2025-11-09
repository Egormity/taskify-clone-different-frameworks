import { Button } from "@mui/material";

export const FormBoardCreateEdit = () => {
	return (
		<div className="space-y-3 rounded-lg bg-white p-5">
			<div>
				<div className="flex items-center justify-between">
					<h2>Create board</h2>
				</div>
			</div>
			<div>Unsplash images</div>
			<div>
				<p>Board title</p>
				<p>Input</p>
			</div>
			<Button variant="contained">Create</Button>
		</div>
	);
};
