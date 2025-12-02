import * as z from "zod";

const RegisterSchema = z.object({
    name: z.string().min(2, "minimum two chars in username"),
    email: z.email("input correct email"),
    password: z.string().min(8, "minimum 8 chars in password").refine(value => /\d/.test(value), {
        message: "paswword must include at least one number"
    }).refine(value => /[!@#$%^&*]/.test(value), { message: "password must include special symbiols" })
})
export const validateRegister = (data) => RegisterSchema.safeParse(data);

const LoginSchema = z.object({
    email: z.email("input correct email"),
    password: z.string()
})
export const validateLogin = (data) => LoginSchema.safeParse(data);
