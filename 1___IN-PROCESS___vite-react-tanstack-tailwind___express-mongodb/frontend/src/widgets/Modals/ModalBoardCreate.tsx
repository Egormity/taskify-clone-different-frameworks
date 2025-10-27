import { Button, Modal, ModalProps } from "@mui/material";

export const ModalBoardCreate = ({ modalProps }: { modalProps: Omit<ModalProps, "children"> }) => {
	return (
		<Modal {...modalProps}>
			<div className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-3 rounded-lg bg-white p-5">
				<div>
					<div className="flex items-center justify-between">
						<span />
						<h2>Create board</h2>
						<span>X</span>
					</div>
				</div>
				<div>Unsplash images</div>
				<div>
					<p>Board title</p>
					<p>Input</p>
				</div>
				<Button variant="contained">Create</Button>
			</div>
		</Modal>
	);
};
