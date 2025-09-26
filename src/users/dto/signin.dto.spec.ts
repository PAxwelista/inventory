import { SigninDto } from './signin.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('SigninDto', () => {

  const validDto = {
    username: 'Axel',
    password: 'pass',
  };
  const requiredProps = ['username', 'password'];
  dtoTest<SigninDto>(SigninDto,validDto,requiredProps)

});
