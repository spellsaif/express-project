import { z } from 'zod';

export const verifyUserSchema = z.object({
  params: z.object({
    verificationCode: z.string({
      required_error: ' verificationCode is required'
    }),

    id: z.string({
      required_error: ' verificationCode is required'
    })
  })
});

export type VerifyUserParams = z.infer<typeof verifyUserSchema>['params'];
