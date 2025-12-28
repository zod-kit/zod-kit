import { z } from 'zod';

/**
 * A Zod schema for validating hostnames.
 * Hostnames must be 1-253 characters long, consist of labels separated by dots,
 * each label 1-63 characters long, containing only letters, digits, and hyphens,
 * and cannot start or end with a hyphen.
 *
 * @example
 * // Valid hostname
 * const result = hostname.safeParse('example.com');
 * console.log(result.success); // true
 *
 * // Invalid hostname (starts with hyphen)
 * const result2 = hostname.safeParse('-invalid.com');
 * console.log(result2.success); // false
 *
 * // Invalid hostname (label too long)
 * const result3 = hostname.safeParse('toolonglabeltoolonglabeltoolonglabeltoolonglabeltoolonglabeltoolonglabel.com');
 * console.log(result3.success); // false
 */

const hostname = z
	.custom<string>(
		(value) => {
			if (typeof value !== 'string') return false;
			// Regular expression to validate hostnames according to RFC 1035
			const hostnameRegex =
				/^(?=.{1,253}$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*\.?$/;
			return hostnameRegex.test(value);
		},
		{
			message:
				'Hostname must be 1-253 characters long, consist of labels separated by dots, each label 1-63 characters long, containing only letters, digits, and hyphens, and cannot start or end with a hyphen.',
		},
	)
	.describe('A string that is a valid hostname');

export { hostname };
