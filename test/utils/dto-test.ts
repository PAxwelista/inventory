import { validate } from "class-validator";

export const dtoTest=<T extends object>  (DTOClass : new () =>T,validDto:Partial<T>,requiredProps:string[])=>{
    it('should success with all correct infos', async () => {
        const dto = Object.assign(new DTOClass(), validDto);
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
      })
    
      requiredProps.forEach((prop) => {
        it(`should fail if ${prop} is missing`, async () => {
          const dto = Object.assign(new DTOClass(), validDto);
          delete dto[prop];
          const errors = await validate(dto);
          expect(errors.length).toBeGreaterThan(0);
          const errorProps = errors.map((e) => e.property);
          expect(errorProps).toContain(prop);
        });
      });
}