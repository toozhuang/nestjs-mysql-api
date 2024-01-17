import { Module } from '@nestjs/common';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';

@Module({
  controllers: [ToshlController],
  providers: [ToshlService]
})
export class ToshlModule {}
