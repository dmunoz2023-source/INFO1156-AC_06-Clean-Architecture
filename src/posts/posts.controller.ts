import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { CreatePostUseCase } from "@/posts/application/use-cases/create-post.use-case"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"
import { CreatePostDto, FeedQueryDto } from "@/posts/posts.dtos"

@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    @Post()
    async create(@Body() body: CreatePostDto) {
        const post = await this.createPostUseCase.execute(body)
        return { ok: true, payload: post }
    }

    @Get()
    async findAll() {
        return { message: "use /feed for posts" }
    }

    @Get("feed")
    async getFeed(@Query() query: FeedQueryDto) {
        return { mode: query.mode ?? "latest" }
    }
}