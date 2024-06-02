import { NextApiRequest, NextApiResponse } from "next";
import { corsMiddle } from "@/utils/cors";

export const config = {
  matcher: '/api/:path*',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddle(req, res);

  try {
    const response = await fetch("/api/pinFile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    // Forward the response from the upstream API to the client
    res.status(response.status);
    res.json({message: "Here is the Hello from the middleware!"});
    res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/json");
    res.send(await response.text());
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
