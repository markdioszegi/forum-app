export const apiUrl = 'http://localhost:8888/api';

export interface CustomHTTPResponse {
  status: number;
  message: string;
  data: any;
}

export enum ROLES {
  Admins,
  Guests,
  Silver,
  Gold,
}

export function getPermissionLevel(role: ROLES): number {
  switch (role) {
    case ROLES.Admins:
      return 8;
    case ROLES.Gold:
      return 4;
    case ROLES.Silver:
      return 2;
    case ROLES.Guests:
      return 1;
  }
}

/* PERMISSIONS {
   Readcomments (1)
  Add/deletecomments (2)
 Add/delete topics (4)
 Delete others' comments/topics (8)
} */
