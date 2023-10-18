import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { pathFor } from "@nirtamir2/next-static-paths";
import { NextResponse } from "next/server";

const CREATE_ORGANIZATION_PATH = pathFor("/create-organization");

export default authMiddleware({
  afterAuth(auth, req) {
    const baseUrl = req.experimental_clerkUrl.href;
    if (auth.userId == null && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: baseUrl,
      }) as never;
    }

    if (
      req.nextUrl.pathname !== CREATE_ORGANIZATION_PATH &&
      // NOTICE: It can be a situation that the create-organization exists, but the user does not associate to this org.
      auth.userId != null &&
      auth.orgId == null
    ) {
      const createOrganizationUrl = new URL(CREATE_ORGANIZATION_PATH, baseUrl);
      createOrganizationUrl.searchParams.set("redirect_url", baseUrl);
      return NextResponse.redirect(createOrganizationUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
