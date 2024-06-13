// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if(req.nextUrl.pathname.startsWith("/customers") && 
           req.nextauth.token?.role != "ROLE_ADMIN")
            return NextResponse.rewrite(new URL("/denied", req.url));
}, {
callbacks: {
    authorized: ({token}) => !!token,
},
});

export const config = { matcher: ["/customers"] }