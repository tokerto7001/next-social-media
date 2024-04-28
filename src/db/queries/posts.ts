import type { Post } from '@prisma/client';
import { db } from '..';

export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug | typeof fetchTopPosts>>[number];

export function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } }
        }
    })
}

export async function fetchTopPosts(){
    return db.post.findMany({
        orderBy: [{
            comments: {
                _count: 'desc'
            }
        }],
        include: {
            topic: { select: {slug: true} },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        },
        take: 5
    })
}