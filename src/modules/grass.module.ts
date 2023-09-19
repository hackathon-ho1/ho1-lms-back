import { Module } from '@nestjs/common';
import { GrassController } from '../controllers/grass.controller';
import { GrassService } from '../services/grass.service';
import { GrassProvider } from '../providers/grass.provider';

@Module({
  controllers: [GrassController],
  providers: [GrassService, GrassProvider],
})
export class GrassModule {}
