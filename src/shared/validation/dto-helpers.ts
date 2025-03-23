import { Type } from '@nestjs/common';
import {
  PartialType as MappedPartialType,
  OmitType as MappedOmitType,
  PickType as MappedPickType,
} from '@nestjs/mapped-types';

/**
 * Cria um novo tipo DTO que torna todas as propriedades do DTO original opcionais
 * Útil para criar DTOs de atualização (update) a partir de DTOs de criação (create)
 */
export function PartialType<T>(classRef: Type<T>): Type<Partial<T>> {
  return MappedPartialType(classRef) as Type<Partial<T>>;
}

/**
 * Cria um novo tipo DTO removendo propriedades específicas do DTO original
 * Útil para criar DTOs que não devem incluir certas propriedades
 */
export function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Omit<T, (typeof keys)[number]>> {
  return MappedOmitType(classRef, keys as any) as Type<
    Omit<T, (typeof keys)[number]>
  >;
}

/**
 * Cria um novo tipo DTO incluindo apenas propriedades específicas do DTO original
 * Útil para criar DTOs focados apenas em certas propriedades
 */
export function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Pick<T, (typeof keys)[number]>> {
  return MappedPickType(classRef, keys as any) as Type<
    Pick<T, (typeof keys)[number]>
  >;
}
