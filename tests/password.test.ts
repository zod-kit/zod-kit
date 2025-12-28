import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { password } from '../src/password.ts';

describe('password', () => {
	const passwordSchema = z.object({
		password: password,
	});
	it('should pass valid passwords', () => {
		const validPasswords = [
			'StrongP@ssw0rd!',
			'An0ther$trongPass',
			'Valid#Password123',
			'My_Passw0rd!',
			'Complex*Pass9',
		];

		validPasswords.forEach((testPassword) => {
			const result = passwordSchema.safeParse({ password: testPassword });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid passwords', () => {
		const invalidPasswords = [
			'weakpass', // too short, no uppercase, no number, no special char
			'Short1!', // too short
			'nouppercase1!', // no uppercase letter
			'NOLOWERCASE1!', // no lowercase letter
			'NoNumber!', // no number
			'NoSpecialChar1', // no special character
			'ThisPasswordIsWayTooLongToBeConsideredValidBecauseItExceedsTheMaximumLength1!', // too long
			'No$pecialChar', // no number
		];

		invalidPasswords.forEach((testPassword) => {
			const result = passwordSchema.safeParse({ password: testPassword });
			expect(result.success).toBe(false);
		});
	});
});
