import { Controller, Get, Query } from '@nestjs/common';
import { ToshlService } from '@src/api/toshl/toshl.service';


@Controller('toshl')
export class ToshlController {
  constructor(private  readonly toshlService:ToshlService
              ) {
  }

  @Get()
  async getToshlPageApi(@Query() queryOption: any): Promise<any> {
    return await this.toshlService.getToshlList(queryOption);
  }


}
