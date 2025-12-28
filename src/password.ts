import { z } from 'zod';

/**
 * A schema for validating passwords.
 * Passwords must be between 8 and 64 characters long and include at least one uppercase letter,
 * one lowercase letter, one number, and one special character.
 *
 * @example
 * // Valid password
 * const validPassword = "StrongP@ssw0rd!";
 * password.parse(validPassword); // passes validation
 *
 * // Invalid password
 * const invalidPassword = "weakpass";
 * password.parse(invalidPassword); // throws validation error
 *
 */
const password = z
	.string()
	.min(8)
	.max(64)
	.refine(
		(val) => {
			const hasUpperCase = /[A-Z]/.test(val);
			const hasLowerCase = /[a-z]/.test(val);
			const hasNumber = /[0-9]/.test(val);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
			return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
		},
		{
			message:
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
		},
	);

export { password };
