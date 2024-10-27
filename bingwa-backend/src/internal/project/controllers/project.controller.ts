import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ResponseDto } from '../../../common/dto/response.dto';
import { Project } from '../../../entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ResponseDto<Project>> {
    return this.projectService.createProject(createProjectDto);
  }

  @Get()
  async findAll(): Promise<ResponseDto<Project[]>> {
    return this.projectService.findAllProjects();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Project>> {
    return this.projectService.findOneProject(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseDto<Project>> {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
    return this.projectService.removeProject(id);
  }
}
