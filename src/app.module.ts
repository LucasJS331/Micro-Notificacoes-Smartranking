import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

const config_service = new ConfigService();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config_service.get("TRANSPORT_HOST"),
        port: 587,
        secure: false,
        tls: {
          ciphers: 'SSLv3'
        },
        auth: {
          user: config_service.get("AUTH_USER"),
          pass: config_service.get("AUTH_PASS_KEY")
        }
      }
    }),
    ProxyRMQModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
