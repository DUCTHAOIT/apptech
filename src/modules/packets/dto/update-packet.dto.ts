import { PartialType } from '@nestjs/mapped-types';
import { CreatePacketDto } from './create-packet.dto';

export class UpdatePacketDto extends PartialType(CreatePacketDto) { }
