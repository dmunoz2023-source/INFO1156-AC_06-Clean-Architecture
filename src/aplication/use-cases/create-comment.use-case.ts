import { BadRequestException, Injectable } from "@nestjs/common"
import { CommentRepository } from "@/domain/comment.repository"
import { ModerationService } from "@/moderation/moderation.service"
import { Comment } from "@/domain/comment.entity"

@Injectable()
export class CreateCommentUseCase {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly moderationService: ModerationService,
    ) {}

    async execute(postId: string, content: string): Promise<Comment> {
        const moderation = await this.moderationService.moderate(content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderación",
            )
        }

        const comment = new Comment(
            "",
            postId,
            content,
            "comments-module",
            new Date(),
        )

        return this.commentRepository.save(comment)
    }
}