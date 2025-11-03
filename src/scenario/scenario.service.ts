import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

const ownerSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class ScenarioService {
  constructor(private readonly prisma: PrismaService) {}

  create(ownerId: number, dto: CreateScenarioDto) {
    return this.prisma.scenario.create({
      data: {
        name: dto.name,
        description: dto.description,
        parameters: dto.parameters,
        ownerId,
      },
      include: { owner: { select: ownerSelect } },
    });
  }

  findAll(ownerId: number) {
    return this.prisma.scenario.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: ownerSelect } },
    });
  }

  async findOne(ownerId: number, id: number) {
    const scenario = await this.prisma.scenario.findFirst({
      where: { id, ownerId },
      include: { owner: { select: ownerSelect } },
    });
    if (!scenario) {
      throw new NotFoundException('Scenario not found');
    }
    return scenario;
  }

  async update(ownerId: number, id: number, dto: UpdateScenarioDto) {
    await this.findOne(ownerId, id);
    return this.prisma.scenario.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        parameters: dto.parameters,
      },
      include: { owner: { select: ownerSelect } },
    });
  }

  async remove(ownerId: number, id: number) {
    await this.findOne(ownerId, id);
    await this.prisma.scenario.delete({ where: { id } });
    return true;
  }
}
