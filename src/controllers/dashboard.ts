import EventEmitter from "events";

export default class DashboardController {
  private static instance: DashboardController;

  // Singleton pattern
  static getInstance(): DashboardController {
    if (!DashboardController.instance) {
      DashboardController.instance = new DashboardController();
    }
    return DashboardController.instance;
  }

  private constructor() {}

  // Internal state
  private messages: object[] = [{ type: "showProjects", value: false }];
  private emitter = new EventEmitter();

  // Subscribe a callback to listen for messages
  public subscribe(callback: (message: string) => void): void {
    this.emitter.on("message", callback);
  }

  // Unsubscribe a callback
  public unsubscribe(callback: (message: string) => void): void {
    this.emitter.off("message", callback);
  }

  // Add a message and notify all subscribers
  public addMessage(payload: object): void {
    this.messages.push(payload);
    this.emitter.emit("message", payload);
  }

  // Retrieve current messages
  public getMessages(): object[] {
    return this.messages;
  }

  // Clear all subscribers (useful for hot reload)
  public clearSubscribers(): void {
    this.emitter.removeAllListeners("message");
  }
}

// Handle hot reload in development
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    DashboardController.getInstance().clearSubscribers();
  });
}
