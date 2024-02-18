import { Module } from '@nestjs/common';
import { ToshlController } from './toshl.controller';
import { ToshlService } from './toshl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToshlEntity } from '@src/api/toshl/entities/toshl.entity';
import { RouterModule } from '@nestjs/core';
import { ADMIN_PREFIX } from '@src/constants';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX, // 指定项目名称
        module: ToshlModule,
      },
    ]),
    TypeOrmModule.forFeature([ToshlEntity]),
  ],
  controllers: [ToshlController],
  providers: [ToshlService],
})
export class ToshlModule {}
