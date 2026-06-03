import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import {
    CreateProhibitedWordData,
    ProhibitedWord,
    ProhibitedWordRepository,
} from "@/moderation/domain/repositories/prohibited-word.repository"

@Injectable()
export class ProhibitedWordPrismaRepository implements ProhibitedWordRepository {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<ProhibitedWord[]> {
        return this.prisma.prohibitedWord.findMany({
            orderBy: { createdAt: "desc" },
        })
    }

    create(data: CreateProhibitedWordData): Promise<ProhibitedWord> {
        return this.prisma.prohibitedWord.create({ data })
    }

    async delete(id: string): Promise<ProhibitedWord> {
        try {
            return await this.prisma.prohibitedWord.delete({ where: { id } })
        } catch (err: unknown) {
            if (
                err instanceof Error &&
                "code" in err &&
                (err as { code: string }).code === "P2025"
            ) {
                throw new NotFoundException("Palabra prohibida no encontrada")
            }
            throw err
        }
    }
}
