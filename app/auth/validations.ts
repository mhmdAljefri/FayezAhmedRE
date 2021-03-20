import * as z from "zod"

export const SignupInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirm: z.string().min(6).max(100),
  })
  .refine((data) => data.password === data.confirm, {
    message: "كلمة المرور لا تتطابق مع التاكيد",
    path: ["confirm"],
  })

export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>
