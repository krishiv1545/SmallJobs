import { loadEnv } from "vite";

class WebSocketService {
  constructor() {
    const env = loadEnv(import.meta.env.MODE, process.cwd(), "");
    this.baseURL = env.VITE_DJANGO_BASE_WS_URL;
  }

  connect(path) {
    return new WebSocket(`${this.baseURL.replace(/\/$/, "")}${path}`);
  }
}

const wsService = new WebSocketService();
export default wsService;
