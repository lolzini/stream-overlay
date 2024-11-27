import type { APIRoute } from "astro";
import DashboardController from "@controllers/dashboard";

export const GET: APIRoute = async ({ request }) => {
  const body = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let isClosed = false;

      // Function to safely enqueue messages
      const sendEvent = (data: any) => {
        if (isClosed) return; // Prevent enqueuing after close
        try {
          const message = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          console.error("Error enqueuing data:", error);
        }
      };

      // Subscribe to DashboardController events
      const dashboardController = DashboardController.getInstance();
      dashboardController.subscribe(sendEvent);

      // Close the stream when the connection is aborted
      request.signal.addEventListener("abort", () => {
        if (!isClosed) {
          isClosed = true;
          dashboardController.unsubscribe(sendEvent);
          try {
            controller.close();
          } catch (error) {
            console.error("Error closing the controller:", error);
          }
        }
      });
    },
    cancel() {
      // Handle stream cancellation
      console.log("ReadableStream was canceled by the client.");
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
