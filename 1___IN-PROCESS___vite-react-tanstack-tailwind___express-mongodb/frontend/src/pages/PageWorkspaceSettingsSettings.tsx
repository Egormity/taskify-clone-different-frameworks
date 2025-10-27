import { Button, Link } from "@mui/material";

export const PageWorkspaceSettingsSettings = () => {
	return (
		<div className="space-y-10">
			<div className="h-20 space-y-1">
				<h1 className="text-4xl font-bold">Settings</h1>
				<h2 className="font-semibold text-stone-600">Manage workspace settings</h2>
			</div>

			{/*  */}
			<div className="space-y-5">
				<h3 className="border-b border-stone-200 pb-1 text-xl font-semibold">Workspace profile</h3>
				<div className="space-y-3">
					<div className="flex items-center gap-5">
						<div>Avatar</div>
						<div>
							<p>Profile image</p>
							<Link onClick={() => alert("TODO: Upload image")}>TODO: Upload image</Link>
						</div>
					</div>
					<div>Input: Workspace Name</div>
				</div>

				{/*  */}
				<div className="flex items-center justify-end gap-5">
					<Button onClick={() => alert("TODO:")}>TODO: CANCEL</Button>
					<Button variant="contained" onClick={() => alert("TODO:")}>
						TODO: SAVE
					</Button>
				</div>
			</div>

			{/*  */}
			<div className="space-y-5">
				<h3 className="border-b border-stone-200 pb-1 text-xl font-semibold">Danger</h3>
				<div className="flex items-center gap-5">
					<Button variant="outlined" color="error" onClick={() => alert("TODO:")}>
						TODO: LEAVE WORKSPACE
					</Button>
					<Button variant="outlined" color="error" onClick={() => alert("TODO:")}>
						TODO: DELETE WORKSPACE
					</Button>
				</div>
			</div>
		</div>
	);
};
