import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const moduleName = 'Todo';

@ApiTags('Event')
@Controller('todo')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @HttpCode(HttpStatus.OK)
  //   @UseGuards(RolesGuard)
  @ApiOperation({ summary: `Create ${moduleName}` })
  @Post('')
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  //   @Role(USER_ROLE.VENDOR)
  //   @UseGuards(RolesGuard)
  @ApiOperation({ summary: `Update ${moduleName}` })
  @Put(':todoId')
  updateTodo(
    @Body() updateEventDto: UpdateTodoDto,
    @Param('todoId') todoId: string,
  ) {
    return this.todoService.updateTodo({ updateEventDto, todoId });
  }

  @ApiOperation({ summary: `Get ${moduleName} List` })
  @Get('')
  getTodo(
    // @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.todoService.getTodo({ page, limit });
  }

  @ApiOperation({ summary: `Get One ${moduleName} ` })
  @Get(':todoId')
  getOneTodoById(@Param('todoId') todoId: string) {
    return this.todoService.getOneTodoById(todoId);
  }

  @ApiOperation({ summary: `Delete ${moduleName} ` })
  @Delete(':todoId')
  deleteOneTodoById(@Param('todoId') todoId: string) {
    return this.todoService.deleteOneTodoById(todoId);
  }
}
