import { Module } from "@nestjs/common"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsController } from "@/posts/posts.controller"
import { PostRepository } from "@/posts/domain/repositories/post.repository"
import { PostPrismaRepository } from "@/posts/infrastructure/repositories/post.prisma.repository"
import { CreatePostUseCase } from "@/posts/application/use-cases/create-post.use-case"

@Module({
    imports: [ModerationModule],
    controllers: [PostsController],
    providers: [
        CreatePostUseCase,
        FeedRankingStrategyFactory,
        {
            provide: PostRepository,
            useClass: PostPrismaRepository,
        },
    ],
    exports: [PostRepository],
})
export class PostsModule {}