export type HttpResponseModel<T> = {
    ok: boolean,
    message: string
    data?: T
}