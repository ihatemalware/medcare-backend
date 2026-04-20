import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FamilyService } from './family.service';

@ApiTags('Family')
@ApiBearerAuth()
@Controller('api/family/members')
@UseGuards(JwtAuthGuard)
export class FamilyController {
  constructor(private familyService: FamilyService) {}

  @Get()
  @ApiOperation({ summary: 'List all family members of current user' })
  @ApiOkResponse({
    description: 'Array of family members',
    schema: {
      example: [
        {
          id: 'member-1',
          full_name: 'Nguyễn Thị B',
          relationship: 'Mẹ',
          phone: '0912345678',
        },
      ],
    },
  })
  async findAll(@Request() req) {
    return this.familyService.findAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new family member' })
  @ApiBody({
    schema: {
      example: {
        full_name: 'Nguyễn Thị B',
        relationship: 'Mẹ',
        phone: '0912345678',
      },
    },
  })
  @ApiOkResponse({
    description: 'Created family member',
    schema: {
      example: {
        status: 'success',
        data: {
          id: 'member-1',
          full_name: 'Nguyễn Thị B',
          relationship: 'Mẹ',
          phone: '0912345678',
        },
      },
    },
  })
  async create(@Request() req, @Body() body: any) {
    return this.familyService.createMember(req.user.id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a family member' })
  @ApiBody({
    schema: {
      example: {
        full_name: 'Nguyễn Thị B',
        relationship: 'Mẹ',
        phone: '0912345678',
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated family member',
    schema: {
      example: {
        status: 'success',
        data: {
          id: 'member-1',
          full_name: 'Nguyễn Thị B',
          relationship: 'Mẹ',
          phone: '0912345678',
        },
      },
    },
  })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.familyService.updateMember(req.user.id, id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a family member' })
  @ApiOkResponse({
    description: 'Delete result',
    schema: {
      example: {
        status: 'success',
      },
    },
  })
  async remove(@Request() req, @Param('id') id: string) {
    return this.familyService.removeMember(req.user.id, id);
  }
}
