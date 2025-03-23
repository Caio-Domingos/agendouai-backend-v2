/**
 * Base class for Create DTOs - extend this for type safety
 */
export abstract class BaseCreateDto {
  constructor(partial?: Partial<BaseCreateDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
