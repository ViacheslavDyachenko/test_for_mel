// Перечисление методов HTTP-запроса
export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST'
}

// Параметры запроса
export type RequestParams = {
    method: HTTPMethod; // Метод запроса, GET или POST
    endpoint: string; // API-endpoint, на который делается запрос
    headers: Record<string, any>; // Объект с передаваемыми HTTP-заголовками
}

// Перечисление статусов ответа
export enum StatusHTTP {
    OK = 200,
    forbidden = 403,
    notFound = 404,
    BAD_STATUS = 'BAD_STATUS'
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
    success: true;
    data: SuccessT;
    status: StatusHTTP;
}
    | {
    success: false;
    data: ErrorT;
    status: StatusHTTP;
}
    | {
        success: false;
        data: any;
        status: StatusHTTP.BAD_STATUS;
};

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
    // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
    readonly baseUrl: string;

    // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
    request<SuccessT, ErrorT = any>(params: RequestParams): Promise<ApiResponse<SuccessT, ErrorT>>
}