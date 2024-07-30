import { z } from "zod";

export const signInAdmSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  accessCode: z
    .string()
    .min(6, "O código de acesso deve ter no mínimo 6 caracteres"),
});

export type SignInAdmSchema = z.infer<typeof signInAdmSchema>;

export const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const createUsersSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type CreateUserSchema = z.infer<typeof createUsersSchema>;

export const editUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
