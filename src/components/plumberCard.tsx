import Image from "next/image";
import { Fragment } from "react";

interface PlumberCardProps {
  image: string;
  firstname: string;
  lastname: string;
}

export default function PlumberCard({
  image,
  firstname,
  lastname,
}: PlumberCardProps) {
  return (
    <Fragment>
      <div className="relative h-[70%] w-full overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={`Plumber image of ${firstname} ${lastname}`}
          fill
          style={{ objectFit: "cover" }}
          className="flex items-center justify-center rounded-t-xl"
        />
      </div>
      <div className="">
        <p>
          {firstname} {lastname}
        </p>
      </div>
    </Fragment>
  );
}
