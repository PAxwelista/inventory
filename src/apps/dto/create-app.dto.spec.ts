
import { CreateAppDto } from './create-app.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('CreateAppDto', () => {
  const validDto = {
    name: 'App1'
  };
  const requiredProps = ['name'];

  dtoTest<CreateAppDto>(CreateAppDto,validDto,requiredProps)
 
});
