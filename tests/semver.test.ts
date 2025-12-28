import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { semver } from '../src/web/semver';

describe('semver', () => {
	const semverSchema = z.object({
		version: semver,
	});

	it('should pass valid semantic versions', () => {
		const validVersions = [
			'1.0.0',
			'2.1.3',
			'0.0.1',
			'10.20.30',
			'1.0.0-alpha',
			'1.0.0+build.1',
			'1.0.0-alpha+build.1',
			'1.0.0-rc.1+build.123',
		];

		validVersions.forEach((testVersion) => {
			const result = semverSchema.safeParse({ version: testVersion });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid semantic versions', () => {
		const invalidVersions = [
			'1',
			'1.0',
			'a.b.c',
			'1.0.0-alpha_beta',
			'1.0.0-',
			'1.0.0+',
			'1.0.0-alpha..1',
			'1.0.0+build..1',
			'1.0.0-alpha+',
			'',
			'   ',
		];

		invalidVersions.forEach((testVersion) => {
			const result = semverSchema.safeParse({ version: testVersion });
			expect(result.success).toBe(false);
		});
	});
});
