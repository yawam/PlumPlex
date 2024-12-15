import Link from "next/link";
import PlumberCard from "./plumberCard";

interface PlumberNearbySectionprops {
  nearbyPlumbers: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    image: string;
    created_at: Date;
    updated_at: Date;
  }[];
}
export default function PlumbersNearbySection({
  nearbyPlumbers,
}: PlumberNearbySectionprops) {
  return (
    <div className="flex h-[250px] flex-row space-x-2 overflow-x-scroll p-4 md:h-[250px]">
      {nearbyPlumbers.map((plumber) => (
        <Link
          key={plumber.id}
          href={`/plumber/${plumber.id}`}
          className="w-[200px] flex-none snap-center rounded-xl shadow-md md:w-[300px]"
        >
          <div className="h-full w-full flex-none rounded-xl bg-slate-300 md:w-[300px]">
            <PlumberCard
              image={plumber.image}
              firstname={plumber.firstname}
              lastname={plumber.lastname}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
