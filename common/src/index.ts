import zod, { string } from "zod";

export const signupinput = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  name: zod.string().optional(),
});

export const signininput = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

export const createblog = zod.object({
  title: zod.string(),
  content: zod.string(),
});

export const updateblog = zod.object({
  title: zod.string(),
  content: zod.string(),
  id: zod.string(),
});
export type SignupInput = zod.infer<typeof signupinput>;
export type SigninInput = zod.infer<typeof signininput>;
export type CreateBlog = zod.infer<typeof createblog>;
export type UpdateBlog = zod.infer<typeof updateblog>;
