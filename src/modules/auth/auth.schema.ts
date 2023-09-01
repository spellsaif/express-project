import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email should be string'
      })
      .email(),

    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password should be string'
      })
      .min(8, 'should be atleast 8 characters')
  })
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];
