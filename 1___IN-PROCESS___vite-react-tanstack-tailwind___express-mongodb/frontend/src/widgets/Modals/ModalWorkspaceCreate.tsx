import { Modal, ModalProps } from "@mui/material";

export const ModalWorkspaceCreate = ({ modalProps }: { modalProps: Omit<ModalProps, "children"> }) => {
	return (
		<Modal {...modalProps}>
			<div className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-3 rounded-lg bg-white p-5">
				TODO: ModalWorkspaceCreate
			</div>
		</Modal>
	);
};
