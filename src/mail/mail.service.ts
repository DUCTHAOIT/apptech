import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendHello() {
        await this.mailerService.sendMail({
            to: 'ducthao.hp93@gmail.com',
            subject: 'Test Hello',
            text: 'Hello World',
        });

        return 'Email sent';
    }
}
