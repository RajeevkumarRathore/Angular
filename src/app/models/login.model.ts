export interface LoginModel {
  data: UserTokenInfo;
}
export interface UserTokenInfo{
  tokens: TokenInfo;
  userInfoDto: UserInfo
}
export interface TokenInfo{
  createdDate: Date;
  expiration: Date;
  id: number;
  memberID: string;
  refreshToken: string;
  refreshTokenEndDate: string;
  token: string;
  updatedDate: Date;
  userID: number;
}
export interface UserInfo{
  eMail: string;
  phone: string;
  roleId: number;
  userFullName: string;
  username: string;
}
