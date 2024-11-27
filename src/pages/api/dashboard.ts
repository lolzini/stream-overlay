import type { APIRoute } from "astro";
import DashboardController from "@controllers/dashboard";

export const POST: APIRoute = async ({ request }) => {
  const object = await request.json();
  DashboardController.getInstance().addMessage(object);
  return new Response(null, { status: 204 });
};
