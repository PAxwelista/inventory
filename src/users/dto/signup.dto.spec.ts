import { validate } from 'class-validator';
import { SignupDto } from './signup.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('SignupDto', () => {

  const validDto = {
    username: 'Axel',
    email: 'axel@gmail.com',
    password: 'CorrectPassword1#',
  };
  const requiredProps = ['username', 'email', 'password'];
  dtoTest<SignupDto>(SignupDto,validDto,requiredProps)

  it('should failed with a invalid email', async () => {
    const dto = new SignupDto();
    dto.username = 'Axel';
    dto.email = 'notValid';
    dto.password = 'CorrectPassword1#';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should failed with a invalid password', async () => {
    const dto = new SignupDto();
    dto.username = 'Axel';
    dto.email = 'axel@gmail.com';
    dto.password = 'pass';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
  
});
