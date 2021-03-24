import { Controller, UseGuards, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@src/guard/auth/auth.guard';
import adminConfig from '@src/config/admin.config';
import { AccountRoleService } from '../../services/account-role/account-role.service';
import { AccountRoleListResDto } from './dto/account.role.res.dto';
import { DistributionRoleDto } from './dto/distribution.role.dto';

@ApiTags('后台管理系统-账号角色管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/account_role`)
export class AccountRoleController {
  constructor(
    private readonly accountRoleService: AccountRoleService,
  ) {}

  @ApiOperation({ summary: '获取角色列表', description: '根据当前的账号id获取角色已经授权的角色' })
  @ApiCreatedResponse({
    type: AccountRoleListResDto,
    isArray: true,
    description: '根据账号ID查询授权角色返回值'
  })
  @HttpCode(HttpStatus.OK)
  @Get(':accountId')
  async accountRoleListByAccountId(
    @Param('accountId', new ParseIntPipe()) accountId: number
  ): Promise<AccountRoleListResDto[] | undefined> {
    return this.accountRoleService.accountRoleListByAccountId(accountId);
  }

  @ApiOperation({ summary: '给账号分配角色', description: '给当前账号分配角色' })
  @ApiCreatedResponse({
    type: String,
    description: '给账号授权角色返回值'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async distributionRole(
    @Body() distributionRoleDto: DistributionRoleDto
  ): Promise<string> {
    return await this.accountRoleService.distributionRole(distributionRoleDto);
  }
}