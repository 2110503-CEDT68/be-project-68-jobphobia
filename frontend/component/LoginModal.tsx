import { useEffect, useRef, useState } from "react";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/* =========================
		LOCK BACKGROUND SCROLL
  ========================= */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

	/* =========================
     CLICK OUTSIDE CLOSE
  ========================= */
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (modalRef.current &&
        !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }else{
        localStorage.setItem("token", data.token);
      }

      console.log("LOGIN SUCCESS", data);
      alert('success');
      onClose();
    } catch (err) {
      console.error(err);
      alert('failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 " onMouseDown={handleOutsideClick}>
      
      <div className="bg-white p-6 rounded-xl w-80 relative text-black" ref={modalRef}>
        
        <button
          className="absolute top-2 right-3 text-xl hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-black text-white w-full p-2 rounded" onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}