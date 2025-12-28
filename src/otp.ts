import { z } from 'zod';

/**
 * OTP (One-Time Password) schema
 * - Allows exactly 6 digits
 *
 * @example
 * ```ts
 * import { otp } from 'zod-kit';
 *
 * const otpSchema = z.object({
 *   otp: otp,
 * });
 *
 * // Valid OTPs
 * otpSchema.parse({ otp: '123456' }); // passes
 *
 * // Invalid OTPs
 * otpSchema.parse({ otp: '12345' }); // throws error (too short)
 * otpSchema.parse({ otp: '1234567' }); // throws error (too long)
 * otpSchema.parse({ otp: '12345a' }); // throws error (non-digit characters)
 * ```
 */
const otp = z.custom<string>(
	(val) => {
		if (typeof val !== 'string') return false;
		return /^\d{6}$/.test(val);
	},
	{ message: 'Invalid OTP' },
);

export { otp };
