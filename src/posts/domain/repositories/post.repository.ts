import { PostEntity } from "./post.entity"

export type FeedPost = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
    relevanceScore: number
}

export abstract class PostRepository {
    abstract create(data: {
        title: string
        description: string
        imageUrl: string
        categoryId?: string
    }): Promise<PostEntity>

    abstract findAll(): Promise<PostEntity[]>
    abstract findById(id: string): Promise<PostEntity | null>
    abstract findFeedPosts(categoryId?: string): Promise<FeedPost[]>
}