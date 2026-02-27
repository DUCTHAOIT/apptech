import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacketDto } from './dto/create-packet.dto';
import { UpdatePacketDto } from './dto/update-packet.dto';
import { Packet } from './entities/packet.entity';

@Injectable()
export class PacketService {
  constructor(
    @InjectRepository(Packet)
    private readonly packetRepository: Repository<Packet>,
    // private readonly packetRepo: Repository<Packet>,
  ) { }

  // Create
  async create(createPacketDto: CreatePacketDto): Promise<Packet> {
    const packet = this.packetRepository.create(createPacketDto);
    return await this.packetRepository.save(packet);
  }

  // Get all
  async findAll() {
    const [results, total] = await this.packetRepository.findAndCount({
      select: [
        'packetId',
        'packetName',
        'isActive',
        'packetPrice',
        'description',
        'createdAt',
        'updatedAt',
        'isActive',
      ],
      order: { packetPrice: 'DESC' },
    });

    return {
      results,
    };
  }

  // Get one by id
  async findOne(packetId: number): Promise<Packet> {
    const packet = await this.packetRepository.findOne({
      where: { packetId },
    });

    if (!packet) {
      throw new NotFoundException(`Packet ${packetId} not found`);
    }

    return packet;
  }

  // Update
  async update(
    packetId: number,
    updatePacketDto: UpdatePacketDto,
  ): Promise<Packet> {
    const packet = await this.findOne(packetId);

    Object.assign(packet, updatePacketDto);

    return await this.packetRepository.save(packet);
  }

  // Delete
  async remove(packetId: number): Promise<void> {
    const result = await this.packetRepository.delete(packetId);

    if (result.affected === 0) {
      throw new NotFoundException(`Packet ${packetId} not found`);
    }
  }
}
