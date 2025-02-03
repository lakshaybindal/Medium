import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signininput, signupinput } from "@lakshay_bindal/medium-common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const { success } = signupinput.safeParse(body);
  console.log(success);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token: jwt });
  } catch (e) {
    c.status(411);
    return c.json({ error: "User already exists" });
  }
});
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signininput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token: jwt });
  } catch (e) {
    c.status(411);
    return c.json({ error: "User already exists" });
  }
});
