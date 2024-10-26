import AppDataSource from '../config/orm.config';
import { User } from '../entities/user.entity';
import { Document } from '../entities/document.entity';
import { Customer } from '../entities/customer.entity';
import { Interaction } from '../entities/interaction.entity';
import { Project } from '../entities/project.entity';
import { Role } from '../common/enums/roles.enum';
import { LeadStatus } from '../entities/customer.entity';
import { InteractionType } from '../entities/interaction.entity';
import { ProjectStatus } from '../entities/project.entity';
import * as bcrypt from 'bcrypt'; 

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const documentRepository = AppDataSource.getRepository(Document);
    const customerRepository = AppDataSource.getRepository(Customer);
    const interactionRepository = AppDataSource.getRepository(Interaction);
    const projectRepository = AppDataSource.getRepository(Project);

    // Define users with different roles
    const users = [
      {
        firstName: 'Alice',
        lastName: 'Admin',
        email: 'alice.admin@example.com',
        phoneNumber: '1234567890',
        address: '123 Admin St.',
        kraPin: 'KRA12345A',
        password: 'admin123',
        role: Role.ADMIN,
      },
      {
        firstName: 'Bob',
        lastName: 'Engineer',
        email: 'bob.engineer@example.com',
        phoneNumber: '0987654321',
        address: '456 Engineer St.',
        kraPin: 'KRA54321B',
        password: 'engineer123',
        role: Role.ENGINEER,
      },
      {
        firstName: 'Charlie',
        lastName: 'Manager',
        email: 'charlie.manager@example.com',
        phoneNumber: '1122334455',
        address: '789 Manager Ave.',
        kraPin: 'KRA11223C',
        password: 'manager123',
        role: Role.MANAGER,
      },
    ];

    // Insert users into the database
    const savedUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash password
      const user = userRepository.create({ ...userData, password: hashedPassword }); // Use hashed password
      savedUsers.push(await userRepository.save(user));
    }

    // Define documents
    const documents = [
      {
        name: 'KRA PIN',
        type: 'pdf',
        path: 'documents/kra_pin.pdf',
        user: savedUsers[0], // Alice
      },
      {
        name: 'ID Document',
        type: 'jpg',
        path: 'documents/id_document.jpg',
        user: savedUsers[1], // Bob
      },
    ];

    // Insert documents into the database
    for (const documentData of documents) {
      const document = documentRepository.create(documentData);
      await documentRepository.save(document);
    }

    // Define customers
    const customers = [
      {
        companyName: 'Acme Corp',
        contactPerson: 'John Doe',
        email: 'john.doe@acmecorp.com',
        phone: '555-1234',
        address: '456 Acme Ave.',
        leadStatus: LeadStatus.NEW,
        notes: 'Initial contact made.',
      },
      {
        companyName: 'Globex Inc',
        contactPerson: 'Jane Smith',
        email: 'jane.smith@globex.com',
        phone: '555-5678',
        address: '789 Globex Blvd.',
        leadStatus: LeadStatus.CONTACTED,
        notes: 'Follow-up required.',
      },
    ];

    // Insert customers into the database
    const savedCustomers = [];
    for (const customerData of customers) {
      const customer = customerRepository.create(customerData);
      savedCustomers.push(await customerRepository.save(customer));
    }

    // Define interactions
    const interactions = [
      {
        type: InteractionType.PHONE,
        description: 'Discussed project details with John.',
        customer: savedCustomers[0], // Acme Corp
        user: savedUsers[1], // Bob
      },
      {
        type: InteractionType.EMAIL,
        description: 'Sent proposal to Jane.',
        customer: savedCustomers[1], // Globex Inc
        user: savedUsers[0], // Alice
      },
    ];

    // Insert interactions into the database
    for (const interactionData of interactions) {
      const interaction = interactionRepository.create(interactionData);
      await interactionRepository.save(interaction);
    }

    // Define projects
    const projects = [
      {
        name: 'Project Alpha',
        description: 'A project for Acme Corp.',
        status: ProjectStatus.IN_PROGRESS,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        customer: savedCustomers[0], 
        projectManager: savedUsers[2],
      },
      {
        name: 'Project Beta',
        description: 'A project for Globex Inc.',
        status: ProjectStatus.PLANNED,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        customer: savedCustomers[1], 
        projectManager: savedUsers[2], 
      },
    ];

    // Insert projects into the database
    for (const projectData of projects) {
      const project = projectRepository.create(projectData);
      await projectRepository.save(project);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

seedDatabase();
