type Shop = {
  _id: string;
  name: string;
  address?: string;
  tel?: string;
};

type CardProps = {
  shop: Shop;
};

export default function Card({ shop }: CardProps) {
  return (
    <div className="bg-white w-84 h-106 text-black">
      <h2 className="text-xl font-bold mb-2">
        {shop.name}
      </h2>

      <p className="text-gray-600">
        📍 {shop.address ?? "No address"}
      </p>

      <p className="text-gray-600 mt-2">
        ☎ {shop.tel ?? "No phone"}
      </p>
    </div>
  );
}