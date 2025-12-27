import { describe, expect, it } from "vitest";
import { z } from "zod";
import { slug } from "../src/slug.ts";

describe("slug", () => {
	const slugSchema = z.object({
		slug: slug,
	});

	it("should pass valid slugs", () => {
		const validSlugs = [
			"valid-slug",
			"another-valid-slug-123",
			"slug-with-multiple-parts",
			"a",
			"z-0-9",
		];

		validSlugs.forEach((testSlug) => {
			const result = slugSchema.safeParse({ slug: testSlug });
			expect(result.success).toBe(true);
		});
	});

	it("should fail invalid slugs", () => {
		const invalidSlugs = [
			"Invalid-Slug", // uppercase letters
			"invalid_slug", // underscores
			"invalid slug", // spaces
			"invalid@slug!", // special characters
			"", // empty string
			"-leading-hyphen", // leading hyphen
			"trailing-hyphen-", // trailing hyphen
			"double--hyphen", // consecutive hyphens
			"with/slash", // slash character
			"with.dot", // dot character
		];

		invalidSlugs.forEach((testSlug) => {
			const result = slugSchema.safeParse({ slug: testSlug });
			expect(result.success).toBe(false);
		});
	});
});
