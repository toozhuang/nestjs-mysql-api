import { Module } from '@nestjs/common';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToshlEntity } from '@src/api/toshl/entities/toshl.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ToshlEntity])
  ],
  controllers: [ToshlController],
  providers: [ToshlService]
})
export class ToshlModule {}
