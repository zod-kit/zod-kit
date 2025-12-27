import { z } from 'zod';

const slug = z
	.custom<string>(
		(val) => {
			if (typeof val !== 'string') return false;
			const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
			return (
				slugRegex.test(val) &&
				!val.startsWith('-') &&
				!val.endsWith('-') &&
				!val.includes('--')
			);
		},
		{
			message: 'slug invalid',
		},
	)
	.transform((val) => (val as string).toLowerCase().trim());

export { slug };
