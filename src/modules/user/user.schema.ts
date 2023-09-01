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

export const passwordResetSchema = z.object({
  params: z.object({
    passwordResetCode: z.string({
      required_error: 'password reset code is required!'
    }),
    id: z.string({
      required_error: 'id is required!'
    })
  }),

  body: z.object({
    newPassword: z
      .string({
        required_error: 'new password is required!',
        invalid_type_error: 'new password should be string!'
      })
      .min(6, 'Should be atleast 6 characters!')
  })
});

export type VerifyUserParams = z.infer<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
