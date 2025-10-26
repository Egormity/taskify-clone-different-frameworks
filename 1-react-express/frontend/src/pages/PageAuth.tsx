import { Button, Link as LinkMui, TextField } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const PageAuth = ({ type }: { type: "login" | "sign-up" }) => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm();

	//
	const onSubmit = data => {
		console.log(data);
		navigate({ to: "/workspaces" });
	};

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
						label="Username"
						variant="filled"
						fullWidth
						required
						{...register("username", { required: true })}
					/>
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
					{type === "sign-up" && (
						<TextField
							label="Confirm password"
							variant="filled"
							fullWidth
							{...register("passwordConfirm", { required: true })}
						/>
					)}
				</div>
				<Button variant="contained" color="info" fullWidth type="submit" disabled={!isValid}>
					Continue
				</Button>
				<div className="flex gap-1">
					<p>{type === "login" ? "Don't have an account?" : "Already have an account?"}</p>
					<Link to={type === "login" ? "/sign-up" : "/login"}>
						<LinkMui color="info">{type === "login" ? "Sign up" : "Log in"}</LinkMui>
					</Link>
				</div>
			</form>
		</div>
	);
};
