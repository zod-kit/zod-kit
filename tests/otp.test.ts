import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { otp } from '../src/otp';

describe('otp', () => {
	const otpSchema = z.object({
		otp: otp,
	});
	it('should pass valid OTPs', () => {
		const validOTPs = ['123456', '000000', '999999', '456789'];

		validOTPs.forEach((testOtp) => {
			const result = otpSchema.safeParse({ otp: testOtp });
			expect(result.success).toBe(true);
		});
	});

	it('should fail invalid OTPs', () => {
		const invalidOTPs = [
			'12345', // too short
			'1234567', // too long
			'12345a', // non-digit characters
			'abcdef', // all non-digit characters
			'', // empty string
			'12 3456', // space included
			'12-3456', // special character included
		];

		invalidOTPs.forEach((testOtp) => {
			const result = otpSchema.safeParse({ otp: testOtp });
			expect(result.success).toBe(false);
		});
	});
});
