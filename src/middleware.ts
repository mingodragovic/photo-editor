// src/middleware.ts
import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Extend Convex middleware with redirect logic
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {

  // 🔑 Handle OAuth callback edge case:
  // If Convex sends the user back to your convex.site domain with ?code=...
  const url = new URL(request.url);
  if (url.hostname.endsWith(".convex.site") && url.searchParams.has("code")) {
    // Redirect them back to your frontend (localhost:3000 in dev)
    return nextjsMiddlewareRedirect(request, "http://localhost:3000");
  }
});

export const config = {
  // Run middleware on all routes except static assets
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
