'use client'
import Card from "@/component/Card";
import Login from "@/component/Login";
import Logout from "@/component/Logout";
import Image from "next/image";
import { useEffect, useState } from "react";

type Shop = {
  _id: string;
  name: string;
  address?: string;
  tel?: string;
};

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  
  useEffect(() => {
    const fetchShops = async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/shops/"
      );

      const data = await res.json();
      setShops(data.data);
    };

    fetchShops();
  }, []);


  return (
    <div className="flex flex-col min-h-screen items-center bg-emerald-200 font-mono ">
      <Login></Login>
      <Logout></Logout>
      <div className="w-fit h-10 p-10 bg-sky-800 flex justify-center items-center">
        <h1 className="font-bold text-4xl">Massage Reservation</h1>
      </div>
      <div className="bg-sky-300 grid grid-cols-3 w-3/4 mt-5 gap-10 justify-center p-6">
        {shops.map((shop) => (
          <Card key={shop._id} shop={shop} />
        ))}
      </div>

    </div>
  );
}
