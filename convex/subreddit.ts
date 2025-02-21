import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const subreddits = await ctx.db.query("subreddit").collect();
    if (subreddits.some((s) => s.name === args.name)) {
      throw new ConvexError({ message: "Subreddit already exists." });
    }

    await ctx.db.insert("subreddit", {
      name: args.name,
      description: args.description,
      authorId: user._id,
    });
  },
});

export const get = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const subreddit = ctx.db
      .query("subreddit")
      .filter((q) => q.eq(q.field("name"), args.name))
      .unique();
    if (!subreddit) return null;
    return subreddit;
  },
});
