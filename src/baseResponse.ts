type SuccessResponse = {
  statusCode: number;
  message: string;
  data?: any;
};
export class BaseResponse {
  static response: SuccessResponse = {
    statusCode: 200,
    message: 'Success',
    data: null,
  };

  static success(data: any) {
    this.response.data = data;

    return this.response;
  }
}
