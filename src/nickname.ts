import { z } from 'zod';

/**
 * A Zod schema for validating nicknames.
 * Nicknames must be 3-15 characters long and can only contain letters, numbers, and underscores.
 *
 * @example
 * // Valid nickname
 * const result = nickname.safeParse('user_123');
 * console.log(result.success); // true
 *
 * // Invalid nickname (too short)
 * const result2 = nickname.safeParse('ab');
 * console.log(result2.success); // false
 *
 * // Invalid nickname (invalid characters)
 * const result3 = nickname.safeParse('invalid-char!');
 * console.log(result3.success); // false
 *
 */
const nickname = z
	.custom<string>(
		(value) => {
			if (typeof value !== 'string') return false;
			const nicknameRegex = /^[a-zA-Z0-9_]{3,15}$/;
			return nicknameRegex.test(value);
		},
		{
			message:
				'Nickname must be 3-15 characters long and can only contain letters, numbers, and underscores.',
		},
	)
	.describe('A string that is a valid nickname');

export { nickname };
