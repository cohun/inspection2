export interface UserSite {
  id: string,
  user: string;
  address: string;
  partner: string;
  tel: string;
  email: string;
  sites?: [{name: string;
          info: string}];
  operators?: [{name: string;
                position: string}];
  uid?: [string];
}
