import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { Medal } from "@/assets";

export const PageHello = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-5 text-center">
			<h3 className="flex items-center rounded-full bg-amber-300/90 p-3 text-lg font-bold text-amber-800 uppercase shadow">
				<Medal /> <span>No 1 task managment</span>
			</h3>
			<h1 className="text-6xl font-bold not-md:text-3xl">Taskify helps team move </h1>
			<h1 className="rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-6xl font-bold text-white not-md:text-3xl">
				work forward.
			</h1>
			<h4 className="max-w-[690px] text-2xl text-stone-600 not-md:max-w-[330px]">
				Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
				the way your team works is unique - accomplish it all with Taskify.
			</h4>
			<Link to="/signup">
				<Button variant="contained" className="!px-6 !py-3">
					Get Taskify for free
				</Button>
			</Link>
		</div>
	);
};
