import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendRegister(email: string, codeId: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Comfirm Register',
            template: 'register',
            context: {
                name: email,
                codeId: codeId,
            },
        });
    }

    async sendResetPassword(email: string, codeId: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset password',
            template: 'resetPassword',
            context: {
                name: email,
                codeId: codeId,
            },
        });
    }


}
