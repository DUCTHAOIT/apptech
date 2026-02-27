import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePacketDto {
    @IsNotEmpty({ message: "name không được để trống" })
    packetName: string;

    @IsOptional()
    description: string;

    @IsNotEmpty({ message: "Price không được để trống" })
    @IsNumber()
    packetPrice: number;

    @IsOptional()
    isActive?: boolean;
}
