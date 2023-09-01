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

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required!',
        invalid_type_error: 'email should be string!'
      })
      .email('Not a valid email!')
  })
});

export type VerifyUserParams = z.infer<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
