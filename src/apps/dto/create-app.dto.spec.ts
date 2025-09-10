
import { CreateAppDto } from './create-app.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('CreateAppDto', () => {
  const validDto = {
    name: 'App1',
    user_id: 2,
  };
  const requiredProps = ['name', 'user_id'];

  dtoTest<CreateAppDto>(CreateAppDto,validDto,requiredProps)
 
});
