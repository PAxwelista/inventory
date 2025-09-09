import { validate } from 'class-validator';
import { CreateAppDto } from './create-app.dto';

describe('CreateAppDto', () => {
  it('should success with all correct info', async () => {
    const dto = new CreateAppDto();
    dto.name = 'App1';
    dto.user_id = 2;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
  it('should failed with no name', async () => {
    const dto = new CreateAppDto();
    dto.user_id = 2;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });
  it('should failed with no user_id', async () => {
    const dto = new CreateAppDto();
    dto.name = 'App1';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('user_id');
  });
});
