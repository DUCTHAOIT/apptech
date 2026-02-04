import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorator/customize';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Get('sendMailRegister')
    @Public()
    sendRegister(email, codeId) {
        return this.mailService.sendRegister(email, codeId);
    }
}
