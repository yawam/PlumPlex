import BackButton from "@/components/backButton";
import PlumberDetails from "@/components/plumberDetails";
import ReviewsSection from "@/components/reviewsSection";
import { PrismaClient } from "@prisma/client";

export default async function PlumberInfoPage({
  params,
}: {
  params: { plumberId: string };
}) {
  const { plumberId } = params;
  const prisma = new PrismaClient();

  const plumber = await prisma.plumber.findUnique({
    where: {
      id: plumberId,
    },
  });

  if (!plumber) {
    return (
      <div className="align-center flex h-full w-full justify-center">
        Plumber not found
      </div>
    );
  }
  return (
    <div className="align-center mx-2 flex flex-col justify-center rounded-xl md:mx-[10%]">
      <BackButton />
      {plumber && (
        <>
          <PlumberDetails
            image={plumber.image}
            firstname={plumber.firstname}
            lastname={plumber.lastname}
            email={plumber.email}
            missions={plumber.missions}
            created_at={plumber.created_at}
            latitude={plumber.latitude}
            longitude={plumber.longitude}
          />
          <ReviewsSection plumberId={plumberId} />
        </>
      )}
    </div>
  );
}
