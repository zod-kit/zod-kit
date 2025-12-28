import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { domain } from '../src/web/domain';

describe('domain', () => {
	const domainSchema = z.object({
		domain: domain,
	});

	it('should pass valid domains', () => {
		const validDomains = [
			'example.com',
			'sub.domain.co.uk',
			'my-site123.org',
			'example.io',
			'test-domain.net',
		];

		validDomains.forEach((testDomain) => {
			const result = domainSchema.safeParse({ domain: testDomain });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid domains', () => {
		const invalidDomains = [
			'-invalid.com', // starts with hyphen
			'invalid-.com', // ends with hyphen
			'inva..lid.com', // double dot
			'invalid_char$.com', // invalid character
			'', // empty string
			'   ', // whitespace only
		];

		invalidDomains.forEach((testDomain) => {
			const result = domainSchema.safeParse({ domain: testDomain });
			expect(result.success).toBe(false);
		});
	});
});
