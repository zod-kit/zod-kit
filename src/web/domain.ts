import { z } from 'zod';

/**
 * A Zod schema for validating domain names.
 * Domains must be 1-253 characters long, consist of labels separated by dots,
 * each label 1-63 characters long, containing only letters, digits, and hyphens,
 * and cannot start or end with a hyphen.
 *
 * @example
 * // Valid domain
 * const result = domain.safeParse('example.com');
 * console.log(result.success); // true
 *
 * // Invalid domain (label too long)
 * const result2 = domain.safeParse('toolonglabeltoolonglabeltoolonglabeltoolonglabeltoolonglabeltoolonglabel.com');
 * console.log(result2.success); // false
 *
 * // Invalid domain (empty string)
 * const result3 = domain.safeParse('');
 * console.log(result3.success); // false
 *
 */

const domain = z
	.string()
	.min(1, { message: 'Domain cannot be empty' })
	.max(253, { message: 'Domain cannot exceed 253 characters' })
	.refine(
		(value) => {
			const labels = value.split('.');
			return labels.every((label) => {
				if (label.length < 1 || label.length > 63) return false;
				if (!/^[a-zA-Z0-9-]+$/.test(label)) return false;
				if (label.startsWith('-') || label.endsWith('-')) return false;
				return true;
			});
		},
		{ message: 'Invalid domain format' },
	)
	.describe('A valid domain name');

export { domain };
