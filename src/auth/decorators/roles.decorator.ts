import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('etudiant' | 'parent')[]) =>
  SetMetadata(ROLES_KEY, roles);
