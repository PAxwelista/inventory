import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('createUserDto', () => {
  it('should success with all correct infos', async () => {
    const dto = new CreateUserDto();
    dto.name = 'Axel';
    dto.email = 'axel@gmail.com';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should failed with a invalid email', async () => {
    const dto = new CreateUserDto();
    dto.name = 'Axel';
    dto.email = 'notValid';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
  it('should failed with no name', async () => {
    const dto = new CreateUserDto();

    dto.email = 'axel@gmail.com';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });
  it('should failed with no email', async () => {
    const dto = new CreateUserDto();

    dto.name = 'Axel';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
  it('should failed with no password', async () => {
    const dto = new CreateUserDto();

    dto.name = 'Axel';
    dto.email = 'axel@gmail.com';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
});
