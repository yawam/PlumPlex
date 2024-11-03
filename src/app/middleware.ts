import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Path to redirect if the user is not authenticated
  },
});

export const config = {
  matcher: ["/home", "/register", "/api/register"], // Add paths to protect
};
