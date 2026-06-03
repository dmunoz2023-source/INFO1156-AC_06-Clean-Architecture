import {
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { PostsService } from "@/posts/posts.service"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly postsService: PostsService,
    ) {}

    async listByPostId(postId: string) {
        await this.assertPostExists(postId)

        const comments = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })

        return {
            total_comments: comments.length,
            comments,
        }
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsService.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}
