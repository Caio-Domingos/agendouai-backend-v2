import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategies/jwt.strategy'; // Assuming JwtPayload is the type for the authenticated user

export interface ContextObject {
  user?: JwtPayload; // Or your UserEntity/User DTO if populated differently
  request?: Request; // To be used sparingly, ideally only for low-level needs if unavoidable
  token?: string;
  // You could potentially add other request-scoped items here if necessary,
  // e.g., an EntityManager if you manage transactions at the controller level.
}
