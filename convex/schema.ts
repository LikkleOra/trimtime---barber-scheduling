import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    bookings: defineTable({
        serviceId: v.string(),
        date: v.string(), // YYYY-MM-DD
        time: v.string(), // HH:mm
        customerName: v.string(),
        customerPhone: v.string(),
        notes: v.optional(v.string()),
        status: v.union(v.literal("confirmed"), v.literal("pending")),
    }),
    reviews: defineTable({
        rating: v.number(),
        comment: v.string(),
        imageId: v.optional(v.id("_storage")),
        createdAt: v.number(),
    }),
});
