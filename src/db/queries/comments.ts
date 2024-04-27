import { db } from '..';

export type CommentWithAuthor = Awaited<ReturnType<typeof fetchCommentsByPostId>>[number];

export async function fetchCommentsByPostId(postId: string) {
    return await db.comment.findMany({
        where: { postId },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
}