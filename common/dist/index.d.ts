import zod from "zod";
export declare const signupinput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signininput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createblog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateblog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignupInput = zod.infer<typeof signupinput>;
export type SigninInput = zod.infer<typeof signininput>;
export type CreateBlog = zod.infer<typeof createblog>;
export type UpdateBlog = zod.infer<typeof updateblog>;
