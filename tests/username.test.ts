import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { username } from '../src/username.ts';

describe('username', () => {
	const usernameSchema = z.object({
		username: username,
	});
	it('should pass valid usernames', () => {
		const validUsernames = [
			'valid_username',
			'AnotherValid123',
			'user_name_30chars_longggg',
			'user123',
			'USER_name',
		];

		validUsernames.forEach((testUsername) => {
			const result = usernameSchema.safeParse({ username: testUsername });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid usernames', () => {
		const invalidUsernames = [
			'ab', // too short
			'this_username_is_way_too_long_to_be_valid', // too long
			'invalid-username', // hyphens not allowed
			'invalid username', // spaces not allowed
			'invalid@username!', // special characters
			'', // empty string
			'user.name', // dot character
			'user/name', // slash character
		];

		invalidUsernames.forEach((testUsername) => {
			const result = usernameSchema.safeParse({ username: testUsername });
			expect(result.success).toBe(false);
		});
	});
});
