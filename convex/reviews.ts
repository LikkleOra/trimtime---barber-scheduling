import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const addReview = mutation({
    args: {
        rating: v.number(),
        comment: v.string(),
        imageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("reviews", {
            rating: args.rating,
            comment: args.comment,
            imageId: args.imageId,
            createdAt: Date.now(),
        });
    },
});

export const getReviews = query({
    args: {},
    handler: async (ctx) => {
        const reviews = await ctx.db.query("reviews").order("desc").collect();
        return Promise.all(
            reviews.map(async (review) => ({
                ...review,
                imageUrl: review.imageId ? await ctx.storage.getUrl(review.imageId) : null,
            }))
        );
    },
});
