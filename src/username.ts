import { z } from 'zod';

/**
 * Username schema
 * - Allows alphanumeric characters and underscores
 * - Length between 3 and 30 characters
 * - Case insensitive
 * - No spaces or special characters
 * - Transforms to lowercase and trims whitespace
 *
 * @example
 * ```ts
 * import { username } from 'zod-kit';
 *
 * const userSchema = z.object({
 *   username: username,
 * });
 *
 * // Valid usernames
 * userSchema.parse({ username: 'valid_username' }); // passes
 * userSchema.parse({ username: 'AnotherValid123' }); // passes
 *
 * // Invalid usernames
 * userSchema.parse({ username: 'ab' }); // throws error (too short)
 * userSchema.parse({ username: 'this_username_is_way_too_long_to_be_valid' }); // throws error (too long)
 * userSchema.parse({ username: 'invalid-username' }); // throws error (hyphens not allowed)
 * ```
 */
const username = z
	.custom<string>(
		(val) => {
			if (typeof val !== 'string') return false;
			const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
			return usernameRegex.test(val);
		},
		{
			message: 'username invalid',
		},
	)
	.transform((val) => (val as string).toLowerCase().trim());

export { username };
