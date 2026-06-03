import { BadRequestException, Injectable } from "@nestjs/common"
import { PostRepository } from "../../domain/repositories/post.repository"
import { ModerationService } from "../../../moderation/moderation.service"

export class CreatePostDto {
    title!: string
    description!: string
    imageUrl!: string
    categoryId?: string
}

@Injectable()
export class CreatePostUseCase {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly moderationService: ModerationService,
    ) {}

    async execute(data: CreatePostDto) {
        const text = `${data.title} ${data.description}`
        const moderation = await this.moderationService.moderate(text)

        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Post bloqueado por moderación",
            )
        }

        return this.postRepository.create(data)
    }
}