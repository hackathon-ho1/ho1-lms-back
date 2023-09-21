import { Module } from '@nestjs/common';
import { GotgamController } from '../controllers/gotgam.controller';
import { GotgamService } from '../services/gotgam.service';
import { GotgamProvider } from '../providers/gotgam.provider';

@Module({
  controllers: [GotgamController],
  providers: [GotgamService, GotgamProvider],
})
export class GotgamModule {}
