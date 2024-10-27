import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../../entities/project.entity';
import { Customer } from '../../../entities/customer.entity';
import { User } from '../../../entities/user.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ResponseDto } from '../../../common/dto/response.dto';
import { ProjectStatus } from '../../../common/enums/project-status.enum';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createProject(createProjectDto: CreateProjectDto): Promise<ResponseDto<Project>> {
        const { customerId, projectManagerId, ...projectData } = createProjectDto;

        const customer = await this.customerRepository.findOne({ where: { id: customerId } });
        const projectManager = await this.userRepository.findOne({ where: { id: projectManagerId } });

        if (!customer || !projectManager) {
            throw new NotFoundException('Invalid customer or project manager ID');
        }

        const newProject = this.projectRepository.create({
            ...projectData,
            status: status as ProjectStatus,
            customer: customer,
            projectManager: projectManager,
        });

        await this.projectRepository.save(newProject);
        return new ResponseDto('Project created successfully', newProject);
    }

    async findAllProjects(): Promise<ResponseDto<Project[]>> {
        const projects = await this.projectRepository.find({
            relations: ['customer', 'projectManager', 'engineers'], // Specify relations here
        });
        return new ResponseDto('Projects retrieved successfully', projects);
    }
    

    async findOneProject(id: string): Promise<ResponseDto<Project>> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['customer', 'projectManager', 'engineers'],
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return new ResponseDto('Project retrieved successfully', project);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ResponseDto<Project>> {
        const { customerId, projectManagerId, ...projectData } = updateProjectDto;

        const project = await this.projectRepository.preload({
            id,
            ...projectData,
            status: projectData.status as ProjectStatus,
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        if (customerId) {
            const customer = await this.customerRepository.findOneBy({ id: customerId });
            if (!customer) throw new NotFoundException(`Customer with ID ${customerId} not found`);
            project.customer = customer;
        }

        if (projectManagerId) {
            const projectManager = await this.userRepository.findOneBy({ id: projectManagerId });
            if (!projectManager) throw new NotFoundException(`Project manager with ID ${projectManagerId} not found`);
            project.projectManager = projectManager;
        }

        await this.projectRepository.save(project);
        return new ResponseDto('Project updated successfully', project);
    }

    async removeProject(id: string): Promise<ResponseDto<null>> {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepository.remove(project);
        return new ResponseDto('Project deleted successfully', null);
    }
}
