import ReviewBox from "./reviewBox";
import { PrismaClient } from "@prisma/client";
import { Client } from "@prisma/client";

interface ReviewBoxProps {
  plumberId: string;
}

export default async function ReviewsSection({ plumberId }: ReviewBoxProps) {
  const prisma = new PrismaClient();

  const reviewsFromClients = await prisma.plumberReview.findMany({
    where: {
      revieweeId: plumberId,
    },
  });

  // Extract all unique reviewerIds from the reviews
  const reviewerIds = reviewsFromClients.map((review) => review.reviewerId);

  // Fetch all client information for these reviewerIds
  const clients = await prisma.client.findMany({
    where: {
      id: { in: reviewerIds }, // Fetch clients matching reviewerIds
    },
  });

  // Create a map of clientId to client details for quick lookup
  const clientMap: { [key: string]: Client } = clients.reduce(
    (acc, client) => {
      acc[client.id] = client;
      return acc;
    },
    {} as { [key: string]: Client },
  );
  return (
    <div>
      Reviews
      <div className="flex w-full flex-col bg-slate-200">
        {reviewsFromClients.length > 0 ? (
          reviewsFromClients.map((review) => {
            const client = clientMap[review.reviewerId];
            return (
              <ReviewBox
                key={review.id}
                ClientImage={client?.image || ""}
                ClientName={`${client?.firstname || ""} ${
                  client?.lastname || ""
                }`}
                Rating={review.rating}
                ReviewContent={review?.reviewText || ""}
              />
            );
          })
        ) : (
          <p>No reviews</p>
        )}
      </div>
    </div>
  );
}
