import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Escreva algum email aqui amigo"),
  password: z.string().min(2, "Escreva alguma senha aqui amigo"),
});
