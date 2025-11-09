import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { apiWorkspaces } from "@/api";

//
export const FormWorkspaceCreateEdit = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<{ name: string }>();

	//
	const { mutate } = apiWorkspaces.usePostOne();
	const onSubmit = (data: { name: string }) => mutate({ data });

	//
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-[400px] flex-col gap-3 rounded-lg bg-white p-5"
		>
			<TextField label="Workspace name" required {...register("name", { required: true })} />
			<div className="flex justify-end">
				<Button type="submit" variant="contained" disabled={!isValid}>
					Create
				</Button>
			</div>
		</form>
	);
};
