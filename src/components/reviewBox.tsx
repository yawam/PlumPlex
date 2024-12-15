import Image from "next/image";

interface ReviewBoxProps {
  ClientImage: string;
  ClientName: string;
  Rating: number;
  ReviewContent: string;
}

export default function ReviewBox({
  ClientImage,
  ClientName,
  Rating,
  ReviewContent,
}: ReviewBoxProps) {
  return (
    <div className="flex flex-col border-b-2 border-black p-2">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center">
          <Image
            src={ClientImage}
            alt="Client profile image"
            width={60}
            height={60}
            className="rounded-[100%] p-2"
          />
          <p>{ClientName}</p>
        </div>
        <span className="text-yellow-500">
          {"⭐".repeat(Rating)}
          {"☆".repeat(5 - Rating)}
        </span>
      </div>
      <div>{ReviewContent}</div>
    </div>
  );
}
