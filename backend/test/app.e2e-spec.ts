import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { OrganizationsService } from '../src/organizations/application/organizations.service';
import { OrganizationsController } from '../src/organizations/infrastructure/controllers/organizations.controller';
import { ChargePointsService } from '../src/charge-points/application/charge-points.service';
import { ChargePointsController } from '../src/charge-points/infrastructure/controllers/charge-points.controller';
import { Organization } from '../src/organizations/domain/organization';
import { ChargePoint } from '../src/charge-points/domain/charge-point';

// ── Organizations ─────────────────────────────────────────────────────────────

describe('Organizations (e2e)', () => {
  let app: INestApplication<App>;

  const org = new Organization('org-1', 'Org Test', 'SRL');

  const mockOrgRepo = {
    findById: jest.fn(),
    findByName: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        OrganizationsService,
        { provide: 'OrganizationRepository', useValue: mockOrgRepo },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(() => app.close());
  beforeEach(() => jest.clearAllMocks());

  it('GET /organizations - devuelve lista', async () => {
    mockOrgRepo.findAll.mockResolvedValue([org]);

    const res = await request(app.getHttpServer())
      .get('/organizations')
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Org Test');
  });

  it('GET /organizations/:id - devuelve la organización', async () => {
    mockOrgRepo.findById.mockResolvedValue(org);

    const res = await request(app.getHttpServer())
      .get('/organizations/org-1')
      .expect(200);
    expect(res.body.id).toBe('org-1');
  });

  it('GET /organizations/:id - 404 si no existe', async () => {
    mockOrgRepo.findById.mockResolvedValue(null);

    await request(app.getHttpServer())
      .get('/organizations/no-existe')
      .expect(404);
  });

  it('POST /organizations - crea una organización', async () => {
    mockOrgRepo.findByName.mockResolvedValue(null);
    mockOrgRepo.create.mockResolvedValue(org);

    const res = await request(app.getHttpServer())
      .post('/organizations')
      .send({ name: 'Org Test', legalEntity: 'SRL' })
      .expect(201);

    expect(res.body.name).toBe('Org Test');
    expect(mockOrgRepo.create).toHaveBeenCalledTimes(1);
  });

  it('POST /organizations - 409 si nombre duplicado', async () => {
    mockOrgRepo.findByName.mockResolvedValue(org);

    await request(app.getHttpServer())
      .post('/organizations')
      .send({ name: 'Org Test', legalEntity: 'SRL' })
      .expect(409);
  });

  it('POST /organizations - 400 si falta nombre', async () => {
    await request(app.getHttpServer())
      .post('/organizations')
      .send({ legalEntity: 'SRL' })
      .expect(400);
  });

  it('PUT /organizations/:id - actualiza organización', async () => {
    const updated = new Organization('org-1', 'Org Actualizada', 'SRL');
    mockOrgRepo.findById.mockResolvedValue(org);
    mockOrgRepo.update.mockResolvedValue(updated);

    const res = await request(app.getHttpServer())
      .put('/organizations/org-1')
      .send({ name: 'Org Actualizada' })
      .expect(200);

    expect(res.body.name).toBe('Org Actualizada');
  });

  it('DELETE /organizations/:id - elimina organización', async () => {
    mockOrgRepo.findById.mockResolvedValue(org);
    mockOrgRepo.delete.mockResolvedValue(undefined);

    await request(app.getHttpServer())
      .delete('/organizations/org-1')
      .expect(200);
    expect(mockOrgRepo.delete).toHaveBeenCalledWith('org-1');
  });
});

// ── ChargePoints ──────────────────────────────────────────────────────────────

describe('ChargePoints (e2e)', () => {
  let app: INestApplication<App>;

  const cp = new ChargePoint('cp-1', 'CP-001', 'cpo-test');

  const mockCpRepo = {
    findById: jest.fn(),
    findByIdentity: jest.fn(),
    findAll: jest.fn(),
    findByCpo: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ChargePointsController],
      providers: [
        ChargePointsService,
        { provide: 'ChargePointRepository', useValue: mockCpRepo },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(() => app.close());
  beforeEach(() => jest.clearAllMocks());

  it('GET /charge-points - devuelve lista', async () => {
    mockCpRepo.findAll.mockResolvedValue([cp]);

    const res = await request(app.getHttpServer())
      .get('/charge-points')
      .expect(200);
    expect(res.body).toHaveLength(1);
  });

  it('GET /charge-points/cpo/:cpo - filtra por CPO', async () => {
    mockCpRepo.findByCpo.mockResolvedValue([cp]);

    const res = await request(app.getHttpServer())
      .get('/charge-points/cpo/cpo-test')
      .expect(200);
    expect(res.body[0].cpo).toBe('cpo-test');
  });

  it('GET /charge-points/:id - devuelve el punto de carga', async () => {
    mockCpRepo.findById.mockResolvedValue(cp);

    const res = await request(app.getHttpServer())
      .get('/charge-points/cp-1')
      .expect(200);
    expect(res.body.id).toBe('cp-1');
  });

  it('GET /charge-points/:id - 404 si no existe', async () => {
    mockCpRepo.findById.mockResolvedValue(null);

    await request(app.getHttpServer())
      .get('/charge-points/no-existe')
      .expect(404);
  });

  it('POST /charge-points - crea un punto de carga', async () => {
    mockCpRepo.findByIdentity.mockResolvedValue(null);
    mockCpRepo.create.mockResolvedValue(cp);

    const res = await request(app.getHttpServer())
      .post('/charge-points')
      .send({ identity: 'CP-001', cpo: 'cpo-test' })
      .expect(201);

    expect(res.body.identity).toBe('CP-001');
    expect(mockCpRepo.create).toHaveBeenCalledTimes(1);
  });

  it('POST /charge-points - 409 si identidad duplicada', async () => {
    mockCpRepo.findByIdentity.mockResolvedValue(cp);

    await request(app.getHttpServer())
      .post('/charge-points')
      .send({ identity: 'CP-001', cpo: 'cpo-test' })
      .expect(409);
  });

  it('POST /charge-points - 400 si falta identity', async () => {
    await request(app.getHttpServer())
      .post('/charge-points')
      .send({ cpo: 'cpo-test' })
      .expect(400);
  });

  it('PUT /charge-points/:id - actualiza identidad', async () => {
    const updated = new ChargePoint('cp-1', 'CP-ACTUALIZADO', 'cpo-test');
    mockCpRepo.findById.mockResolvedValue(cp);
    mockCpRepo.update.mockResolvedValue(updated);

    const res = await request(app.getHttpServer())
      .put('/charge-points/cp-1')
      .send({ identity: 'CP-ACTUALIZADO' })
      .expect(200);

    expect(res.body.identity).toBe('CP-ACTUALIZADO');
  });

  it('DELETE /charge-points/:id - elimina punto de carga', async () => {
    mockCpRepo.findById.mockResolvedValue(cp);
    mockCpRepo.delete.mockResolvedValue(undefined);

    await request(app.getHttpServer())
      .delete('/charge-points/cp-1')
      .expect(200);
    expect(mockCpRepo.delete).toHaveBeenCalledWith('cp-1');
  });
});
