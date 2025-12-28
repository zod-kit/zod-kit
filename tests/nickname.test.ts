import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { nickname } from '../src/nickname';

describe('nickname', () => {
	const nicknameSchema = z.object({
		nickname: nickname,
	});

	it('should pass valid nicknames', () => {
		const validNicknames = [
			'user_123',
			'Nickname',
			'userName_15',
			'abc_def',
			'User12345',
		];

		validNicknames.forEach((testNickname) => {
			const result = nicknameSchema.safeParse({ nickname: testNickname });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid nicknames', () => {
		const invalidNicknames = [
			'ab', // too short
			'thisnicknameiswaytoolong', // too long
			'invalid-char!', // special character
			'space name', // space included
			'name-with-dash', // dash included
			'', // empty string
			'user@name', // special character
		];

		invalidNicknames.forEach((testNickname) => {
			const result = nicknameSchema.safeParse({ nickname: testNickname });
			expect(result.success).toBe(false);
		});
	});
});
