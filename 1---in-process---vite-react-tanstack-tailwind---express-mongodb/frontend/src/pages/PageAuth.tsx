import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { TLogin, TSignup, apiAuth } from "@/api";

import { ButtonLogo } from "@/ui";

export const PageAuth = ({ type }: { type: "login" | "signup" }) => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isValid },
		watch,
	} = useForm<TSignup & TLogin>();
	const email = watch("email");

	//
	const { mutate, isPending } = type === "signup" ? apiAuth.useSignup() : apiAuth.useLogin();
	const onSubmit = (data: TSignup) =>
		mutate({ data: data as any }, { onSuccess: () => navigate({ to: "/workspaces" }) });

	//
	return (
		<>
			<div className="relative mx-auto flex h-16 items-center gap-3 border-b-2 border-b-stone-200 bg-white p-5 lg:px-20 2xl:px-40">
				<ButtonLogo />
			</div>
			<div className="flex h-full items-center justify-center bg-slate-50">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-[360px] -translate-y-8 flex-col gap-3 rounded-lg bg-white p-10 shadow-lg"
				>
					<h1 className="text-center text-3xl font-bold">{type === "login" ? "Log in" : "Sign up"}</h1>
					<div className="mt-5 mb-3 flex flex-col gap-3">
						{type === "signup" ? (
							<>
								<TextField
									label="Username"
									variant="filled"
									fullWidth
									required
									{...register("username", { required: true })}
								/>
								<TextField
									label="Email (optional)"
									variant="filled"
									fullWidth
									error={!!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
									type="email"
									{...register("email")}
								/>
							</>
						) : (
							<TextField
								label="Username or email"
								variant="filled"
								fullWidth
								required
								{...register("usernameOrEmail", { required: true })}
							/>
						)}
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
		</>
	);
};
