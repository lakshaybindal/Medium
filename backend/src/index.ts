import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blogs";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use(cors());
app.route("/api/user", userRouter);
app.route("/api/blog", blogRouter);

export default app;
