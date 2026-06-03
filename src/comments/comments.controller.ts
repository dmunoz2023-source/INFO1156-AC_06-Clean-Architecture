import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentDto } from "@/comments/presentation/dtos/create-comment.dto"
import { CommentsService } from "@/comments/comments.service"
import { CreateCommentUseCase } from "@/aplication/use-cases/create-comment.use-case"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly createCommentUseCase: CreateCommentUseCase,
    ) {}

    @Get()
    list(@Param("id") postId: string) {
        return this.commentsService.listByPostId(postId)
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        return this.createCommentUseCase.execute(postId, body.content)
    }
}