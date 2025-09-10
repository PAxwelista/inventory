
import { dtoTest } from '../../../test/utils/dto-test';
import { GetAllAppUserItemsDto } from './get-all-app-user-items.dto';

describe('GetAllAppUserItemsDto', () => {
  const validDto = {
    id: 'axel',
  };
  const requiredProps = ['id'];
  dtoTest<GetAllAppUserItemsDto>(GetAllAppUserItemsDto,validDto,requiredProps)
});
