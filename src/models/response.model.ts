type ApiResponse<T> = {
    status: string;
    payload: T;
    message: string;
};

export const STATUS_SUCCESS = '1'
export const STATUS_ERROR = '2'

export function Response<T>(status: string, payload: T, message: string): ApiResponse<T> {
    return {
        status,
        payload,
        message
    };
}