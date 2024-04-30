import { Module } from '@nestjs/common';
import { AssetManagementController } from './asset-management.controller';
import { AssetManagementService } from './asset-management.service';
import { RouterModule } from '@nestjs/core';
import { ADMIN_PREFIX } from '@src/constants';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX, // 指定项目名称
        module: AssetManagementModule,
      },
    ]),
  ],
  controllers: [AssetManagementController],
  providers: [AssetManagementService],
})
export class AssetManagementModule {}
