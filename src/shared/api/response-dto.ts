export interface ErrorDetailsDTO {
  message: string;
  code: number;
}

export interface SuccessResponseDTO<T = unknown> {
  data: T;
  succeeded: true;
  error: null;
}

export interface ErrorResponseDTO {
  data: null;
  succeeded: false;
  error: ErrorDetailsDTO;
}

export type ResponseDTO<T> = SuccessResponseDTO<T> | ErrorResponseDTO;
