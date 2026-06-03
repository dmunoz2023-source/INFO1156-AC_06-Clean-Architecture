import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../../shared/prisma.service"
import {
    FeedPost,
    PostRepository,
} from "../../domain/repositories/post.repository"
import { PostEntity } from "../../domain/entities/post.entity"

@Injectable()
export class PostPrismaRepository implements PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: {
        title: string
        description: string
        imageUrl: string
        categoryId?: string
    }): Promise<PostEntity> {
        const post = await this.prisma.post.create({ data })
        return new PostEntity(
            post.id,
            post.title,
            post.description,
            post.imageUrl,
            post.categoryId,
            post.createdAt,
            post.updatedAt,
        )
    }

    async findAll(): Promise<PostEntity[]> {
        const posts = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return posts.map(
            (p) =>
                new PostEntity(
                    p.id,
                    p.title,
                    p.description,
                    p.imageUrl,
                    p.categoryId,
                    p.createdAt,
                    p.updatedAt,
                ),
        )
    }

    async findById(id: string): Promise<PostEntity | null> {
        const post = await this.prisma.post.findUnique({ where: { id } })
        if (!post) return null
        return new PostEntity(
            post.id,
            post.title,
            post.description,
            post.imageUrl,
            post.categoryId,
            post.createdAt,
            post.updatedAt,
        )
    }

    async findFeedPosts(categoryId?: string): Promise<FeedPost[]> {
        const posts = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })

        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            categoryId: post.categoryId,
            category: post.category?.name ?? null,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likesCount: post.likes.reduce((sum, l) => sum + l.weight, 0),
            commentsCount: post.comments.length,
            relevanceScore: 0,
        }))
    }
}