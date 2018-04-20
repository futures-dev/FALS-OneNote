export interface Listener<TResponse> {
  (message: TResponse): void;
}
