class WebSocketService {
  constructor() {
    // Connect directly to Django backend in development
    this.baseURL = "ws://localhost:8000/ws";
  }

  connect(path) {
    return new WebSocket(`${this.baseURL}${path}`);
  }
}

const wsService = new WebSocketService();
export default wsService;
