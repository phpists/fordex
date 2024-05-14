import { z } from 'zod';

export const postAddressSchema = z.object({
  id: z.number(),
  zipPostName: z.string(),
  postName: z.string(),
  zip: z.number(),
});
