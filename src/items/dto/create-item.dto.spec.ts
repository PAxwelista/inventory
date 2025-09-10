
import { CreateItemDto } from './create-item.dto';
import { dtoTest } from '../../../test/utils/dto-test';

describe('CreateItemDto', () => {
  const validDto = {
    name: 'Apple',
    quantity: 3,
    app_user_id: 'Axel',
  };
  const requiredProps = ['name', 'quantity', 'app_user_id'];
  dtoTest<CreateItemDto>(CreateItemDto,validDto,requiredProps)
});
