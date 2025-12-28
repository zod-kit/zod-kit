import { z } from 'zod';

/**
 * A Zod schema that validates semantic versioning (semver) strings.
 * Semver strings follow the format: MAJOR.MINOR.PATCH
 * with optional pre-release and build metadata.
 *
 * @example
 * // Valid semver
 * const result = semver.safeParse('1.0.0');
 * console.log(result.success); // true
 *
 * // Valid semver with pre-release and build metadata
 * const result2 = semver.safeParse('1.0.0-alpha+001');
 * console.log(result2.success); // true
 *
 * // Invalid semver
 * const result3 = semver.safeParse('1.0');
 * console.log(result3.success); // false
 *
 * // Invalid semver
 * const result4 = semver.safeParse('v1.0.0');
 * console.log(result4.success); // false
 */

const semver = z
	.custom(
		(value) => {
			if (typeof value !== 'string') return false;
			const semverRegex =
				/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
			return semverRegex.test(value);
		},
		{
			message: 'Invalid semantic versioning (semver) format.',
		},
	)
	.describe('A string that follows semantic versioning (semver) format');

export { semver };
