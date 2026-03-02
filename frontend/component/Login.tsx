'use client'
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Login() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<>
		<div className="fixed right-0 bg-white p-5 rounded-2xl text-black cursor-pointer hover:brightness-95" onClick={() => setOpen(true)}>
			Login
	</div>
		{open && (
			<LoginModal onClose={() => setOpen(false)} />
		)}
		</>
	

	);
}