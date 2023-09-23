import { Module } from '@nestjs/common';
import { GotgamController } from '../controllers/gotgam.controller';
import { GotgamService } from '../services/gotgam.service';
import { GotgamProvider } from '../providers/gotgam.provider';
import { DatabaseProvider } from 'src/providers/database/database.provider';

@Module({
  controllers: [GotgamController],
  providers: [GotgamService, GotgamProvider, DatabaseProvider],
})
export class GotgamModule {}
