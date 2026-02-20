import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBookings = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("bookings").collect();
    },
});

export const addBooking = mutation({
    args: {
        serviceId: v.string(),
        date: v.string(),
        time: v.string(),
        customerName: v.string(),
        customerPhone: v.string(),
        notes: v.optional(v.string()),
        status: v.union(v.literal("confirmed"), v.literal("pending")),
    },
    handler: async (ctx, args) => {
        const bookingId = await ctx.db.insert("bookings", args);
        return bookingId;
    },
});

export const deleteBooking = mutation({
    args: { id: v.id("bookings") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const updateBookingStatus = mutation({
    args: { id: v.id("bookings"), status: v.union(v.literal("confirmed"), v.literal("pending")) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});
