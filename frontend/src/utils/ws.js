class WebSocketService {
  constructor() {
    this.baseURL = import.meta.env.VITE_DJANGO_BASE_WS_URL;
  }

  connect(path) {
    return new WebSocket(`${this.baseURL.replace(/\/$/, "")}${path}`);
  }
}

const wsService = new WebSocketService();
export default wsService;