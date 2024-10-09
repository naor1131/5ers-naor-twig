import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly usersService: StocksService) {}

  @Get()
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.usersService.getStocks();
  }
}
