export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  path?: string;

  constructor(options: {
    success: boolean;
    message: string;
    data?: T;
    path?: string;
  }) {
    this.success = options.success;
    this.message = options.message;
    this.data = options.data;
    this.timestamp = new Date().toISOString();
    this.path = options.path;
  }

  /**
   * Cria uma resposta de sucesso
   */
  static success<T>(
    data?: T,
    message = 'Operação realizada com sucesso',
    path?: string,
  ): ApiResponse<T> {
    return new ApiResponse<T>({
      success: true,
      message,
      data,
      path,
    });
  }

  /**
   * Cria uma resposta de erro
   */
  static error(message: string, path?: string): ApiResponse {
    return new ApiResponse({
      success: false,
      message,
      path,
    });
  }
}
