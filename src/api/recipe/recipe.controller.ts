import { Controller, Get } from '@nestjs/common';
import { RecipeService } from '@src/api/recipe/recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.recipeService.findAll();
  }
}
