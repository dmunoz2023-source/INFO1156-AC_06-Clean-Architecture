import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Comment } from "@/domain/comment.entity"
import { CommentRepository } from "@/domain/comment.repository"

@Injectable()
export class CommentPrismaRepository implements CommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByPostId(postId: string): Promise<Comment[]> {
        const rows = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })

        return rows.map(
            (row) =>
                new Comment(
                    row.id,
                    row.postId,
                    row.content,
                    row.source,
                    row.createdAt,
                ),
        )
    }

    async save(comment: Comment): Promise<Comment> {
        const row = await this.prisma.comment.create({
            data: {
                postId: comment.postId,
                content: comment.content,
                source: comment.source,
            },
        })

        return new Comment(
            row.id,
            row.postId,
            row.content,
            row.source,
            row.createdAt,
        )
    }
}