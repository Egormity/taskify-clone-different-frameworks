import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { TWorkspace } from "@/api";

//
export const FormWorkspaceCreateEdit = () => {
	const { register, handleSubmit } = useForm<TWorkspace>();
	const onSubmit = (data: TWorkspace) => {
		console.log(data);
	};

	//
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-[400px] space-y-3 rounded-lg bg-white p-5">
			<TextField label="Name" {...register("name")} />
			<Button type="submit">Create</Button>
		</form>
	);
};
