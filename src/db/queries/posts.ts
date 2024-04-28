import { db } from '..';

export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug | typeof fetchTopPosts | typeof fetchPostsBySearchTerm>>[number];

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

export async function fetchPostsBySearchTerm(term: string) {
    return db.post.findMany({
        where: {
            OR: [
                {
                    title: {
                    contains: term
                    }
                },
                {
                    content: {
                        contains: term
                    }
                }
            ]
        },
        include: {
            topic: { select: {slug: true} },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } }
        },
    })
}
