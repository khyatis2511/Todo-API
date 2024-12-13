import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(createTodoDto): Promise<any> {
    try {
      const result = await this.prisma.todo.create({
        data: {
          ...createTodoDto,
        },
      });
      if (result) {
        return {
          success: true,
          data: result,
        };
      } else {
        throw new NotFoundException('Record could not be created');
      }
    } catch (error) {
      console.error('[createTodo Error]', error);
      throw new NotFoundException('Record could not be created');
    }
  }

  async updateTodo({ updateEventDto, todoId }): Promise<any> {
    try {
      const result = await this.prisma.todo.findFirst({
        where: {
          id: todoId,
          isDeleted: false,
        },
      });
      if (result) {
        const data = await this.prisma.todo.update({
          where: {
            id: result.id,
          },
          data: {
            updatedAt: DateTime.utc().toISO(),
            ...updateEventDto,
          },
        });
        return {
          success: true,
          data: data,
        };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      console.error('[updateTodo Error]', error);
      throw new NotFoundException();
    }
  }

  async getTodo(params) {
    try {
      const page = Number(params.page);
      const limit = Number(params.limit);
      const skip = (page - 1) * limit;
      const take = limit;

      const totalCount = await this.prisma.todo.count({
        where: {
          isDeleted: false,
        },
      });

      const todos = await this.prisma.todo.findMany({
        skip,
        take,
        where: {
          isDeleted: false,
        },
      });

      if (todos) {
        return {
          success: true,
          message: 'Todos fetched successfully',
          data: todos,
          totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
        };
      } else {
        throw new Error('Failed to fetch todos. Please try again later.');
      }
    } catch (error) {
      console.error('[getTodo Error]', error);
      throw new Error('Failed to fetch todos. Please try again later.');
    }
  }

  async getOneTodoById(todoId) {
    try {
      const todo = await this.prisma.todo.findFirst({
        where: {
          id: todoId,
          isDeleted: false,
        },
      });

      if (todo) {
        return {
          success: true,
          message: 'Todos fetched successfully',
          data: todo,
        };
      } else {
        throw new Error('Failed to fetch todo. Please try again later.');
      }
    } catch (error) {
      console.error('[getTodo Error]', error);
      throw new Error('Failed to fetch todo. Please try again later.');
    }
  }

  async deleteOneTodoById(todoId) {
    try {
      const todo = await this.prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          isDeleted: true,
        },
      });

      if (todo) {
        return {
          success: true,
          message: 'Todos Deleted successfully',
        };
      } else {
        throw new Error('Failed to delete todos. Please try again later.');
      }
    } catch (error) {
      console.error('[deleteOneTodoById Error]', error);
      throw new Error('Failed to delete todos. Please try again later.');
    }
  }
}
