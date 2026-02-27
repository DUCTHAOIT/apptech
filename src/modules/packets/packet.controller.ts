import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePacketDto } from './dto/create-packet.dto';
import { UpdatePacketDto } from './dto/update-packet.dto';
import { PacketService } from './packet.service';

@Controller('packets')
export class PacketController {
  constructor(private readonly packetService: PacketService) { }

  @Post()
  create(@Body() createPacketDto: CreatePacketDto) {
    return this.packetService.create(createPacketDto);
  }

  @Get()
  async findAll(
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.packetService.findAll();
    // return this.usersService.findAll(query, +current, +pageSize);
  }

  @Get(':packetId')
  findOne(@Param('packetId') packetId: number) {
    return this.packetService.findOne(+packetId);
  }

  @Patch(':packetId')
  update(@Param('packetId') packetId: number, @Body() updatePacketDto: UpdatePacketDto) {
    return this.packetService.update(+packetId, updatePacketDto);
  }

  @Delete(':packetId')
  remove(@Param('packetId') packetId: number) {
    return this.packetService.remove(+packetId);
  }
}
