import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const create = mutation({
  args: {
    subject: v.string(),
    body: v.string(),
    subreddit: v.id("subreddits"),
    storageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const postId = await ctx.db.insert("posts", {
      subject: args.subject,
      body: args.body,
      subreddit: args.subreddit,
      author: user._id,
      image: args.storageId || undefined,
    });
    return postId;
  },
});
