import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { hostname } from '../src/web/hostname';

describe('hostname', () => {
	const hostnameSchema = z.object({
		hostname: hostname,
	});
	it('should pass valid hostnames', () => {
		const validHostnames = [
			'example.com',
			'sub.domain.co.uk',
			'localhost',
			'my-site123.org',
			`${'a'.repeat(63)}.com`, // label with 63 characters
			`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(61)}.com`, // total length 253 characters
		];

		validHostnames.forEach((testHostname) => {
			const result = hostnameSchema.safeParse({ hostname: testHostname });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid hostnames', () => {
		const invalidHostnames = [
			'-invalid.com', // starts with hyphen
			'invalid-.com', // ends with hyphen
			'inva..lid.com', // double dot
			`${'toolonglabel'.repeat(10)}.com`, // label too long
			`${'a'.repeat(254)}.com`, // total length too long
			'invalid_char$.com', // invalid character
			'', // empty string
			'   ', // whitespace only
		];

		invalidHostnames.forEach((testHostname) => {
			const result = hostnameSchema.safeParse({ hostname: testHostname });
			expect(result.success).toBe(false);
		});
	});
});
