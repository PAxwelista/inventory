import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('createUserDto', () => {

  const validDto = {
    name: 'Axel',
    email: 'axel@gmail.com',
    password: 'pass',
  };
  const requiredProps = ['name', 'email', 'password'];
  dtoTest<CreateUserDto>(CreateUserDto,validDto,requiredProps)

  it('should failed with a invalid email', async () => {
    const dto = new CreateUserDto();
    dto.name = 'Axel';
    dto.email = 'notValid';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
  
});
