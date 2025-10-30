import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { TSignup } from "@app/api/api/auth/types";
import { apiAuth } from "@app/api/api/auth/useApiAuth";

export const PageAuth = ({ type }: { type: "login" | "signup" }) => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<TSignup>();

	//
	const { mutate, isPending } = type === "signup" ? apiAuth.useSignup() : apiAuth.useLogin();
	const onSubmit = (data: TSignup) => mutate({ data }, { onSuccess: () => navigate({ to: "/workspaces" }) });

	//
	return (
		<div className="flex h-full items-center justify-center bg-slate-50">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-[360px] flex-col gap-3 rounded-lg bg-white p-10 shadow-lg"
			>
				<h1 className="text-center text-3xl font-bold">{type === "login" ? "Log in" : "Sign up"}</h1>
				<div className="mt-5 mb-3 flex flex-col gap-3">
					<TextField
						label="Email"
						variant="filled"
						fullWidth
						required
						{...register("email", { required: true })}
					/>
					<TextField
						label="Password"
						variant="filled"
						fullWidth
						required
						{...register("password", { required: true })}
					/>
					{type === "signup" && (
						<TextField
							label="Confirm password"
							variant="filled"
							fullWidth
							{...register("passwordConfirm", { required: true })}
						/>
					)}
				</div>
				<Button
					variant="contained"
					color="info"
					fullWidth
					type="submit"
					disabled={!isValid}
					loading={isPending}
				>
					Continue
				</Button>
				<div className="flex gap-1">
					<p>{type === "login" ? "Don't have an account?" : "Already have an account?"}</p>
					<Link
						color="info"
						className="cursor-pointer"
						onClick={() => navigate({ to: type === "login" ? "/signup" : "/login" })}
					>
						{type === "login" ? "Sign up" : "Log in"}
					</Link>
				</div>
			</form>
		</div>
	);
};
