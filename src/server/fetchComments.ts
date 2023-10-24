"use server";

import { Clerk } from "@clerk/backend";
import { uniq } from "lodash";
import { config } from "@/config/config";
import { fetchWorkflowService } from "@/lib/fetchWorkflowService";
import { Comment } from "@/server/Comment";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function fetchComments(dealId: string) {
  const comments = (await fetchWorkflowService(config.fetchCommentsUrl, {
    body: {
      dealId,
    },
  })) as Array<Comment>;
  const users = await clerk.users.getUserList({
    userId: uniq(comments.map((comment) => comment.userId)),
  });
  return comments.map((comment) => {
    return {
      ...comment,
      user: users.find((user) => user.id === comment.userId),
    };
  });
}
