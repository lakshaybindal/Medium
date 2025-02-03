import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { verify } from "hono/jwt";
import { createblog, updateblog } from "@lakshay_bindal/medium-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});
blogRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.get("userId") || "";

  const name = await prisma.user.findFirst({
    where: { id: id },
    select: { name: true },
  });
  if (name) return c.json({ name: name.name });
  else return c.json({ name: "" });
});
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createblog.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  const authorId = c.get("userId");
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Blog creation failed" });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateblog.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }
  try {
    const blog = await prisma.blog.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Blog creation failed" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        author: { select: { name: true } },
      },
    });
    return c.json({ blogs });
  } catch (e) {
    c.status(411);
    return c.json({ error: "error" });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.req.param("id"));
  try {
    const blog = await prisma.blog.findFirst({
      where: { id: c.req.param("id") },
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        author: { select: { name: true } },
      },
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ error: "error" });
  }
});
