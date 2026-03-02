"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/auth/logout", {
			headers: {
			Authorization: `Bearer ${token}`,
			},
    });

    localStorage.removeItem("token");

    router.push("/");
    router.refresh();
    alert('logout');
	};

  return (
    <div
      onClick={handleLogout}
      className="fixed right-0 top-16 bg-red-500 text-white p-4 rounded-2xl cursor-pointer hover:brightness-90"
    >
      Logout
    </div>
  );
}