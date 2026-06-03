import { Module } from "@nestjs/common"
import { CommentsController } from "@/comments/comments.controller"
import { CommentsService } from "@/comments/comments.service"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsModule } from "@/posts/posts.module"
import { CommentPrismaRepository } from "@/infraestructure/comment.prisma.repository"
import { CreateCommentUseCase } from "@/aplication/use-cases/create-comment.use-case"

@Module({
    imports: [PostsModule, ModerationModule],
    controllers: [CommentsController],
    providers: [
        CommentsService,
        CommentPrismaRepository,
        CreateCommentUseCase,
        {
            provide: "CommentRepository",
            useClass: CommentPrismaRepository,
        },
    ],
})

export class CommentsModule {

}