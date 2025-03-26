export interface ISocial {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}
export interface ICreateUser {
  name: string;
  username: string;
  password: string;
  phone: string;
  isActive: true;
  userPic: string;
  roles: string[];
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}
export interface IUser {
  name: string;
  username: string;
  phone: string;
  isActive: boolean;
  userPic?: string;
  roles: string[];
  socials?: ISocial;
  createdAt?: number;
  createdBy?: string;
  updatedAt?: number;
  updatedBy?: string;
}

export interface GetMembersResponse {
  success: boolean;
  data: IUser;
}
export interface GetLoginResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    user: IUser;
  };
}
export interface LoginPayload {
  username: string;
  password: string;
}
