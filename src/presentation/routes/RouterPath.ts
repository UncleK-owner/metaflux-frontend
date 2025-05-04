export class RouterPath {
  static readonly ROOT_APP = '/app';
  static readonly ROOT_LANDING = '/';
  static readonly ADDRESS_CREATE = `${RouterPath.ROOT_APP}/address/job/create`;
  static readonly ADDRESS_EDIT = `${RouterPath.ROOT_APP}/address/job/edit/:id`; // Changed to use ROOT_APP
  static readonly ADDRESS_INDEX = `${RouterPath.ROOT_APP}/address/job`;
  static readonly ADDRESS_DETAIL = `${RouterPath.ROOT_APP}/address/job/detail/:id`; // Changed to use ROOT_APP
  static readonly DASHBOARD_INDEX = `${RouterPath.ROOT_APP}dashboard`;
  static readonly MAPS_INDEX = `${RouterPath.ROOT_APP}maps`;
  static readonly SIGN_IN = '/signin';
  static readonly PRICING = '/pricing';
  static readonly LANDING = '/landing';
  static readonly HOME = '/app';
  static readonly HOME_INDEX = `${RouterPath.ROOT_APP}`; // Changed to use ROOT_APP
}