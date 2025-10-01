export class ApiServiceError extends Error {
  public readonly supportMessage: string;
  public readonly userMessage: string;

  constructor(title: string, detail: string) {
    super(`${title}: ${detail}`);
    this.name = 'ApiServiceError';
    this.supportMessage = title;
    this.userMessage = detail;

    // Maintains proper stack for VMs that support it
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, ApiServiceError);
    }
    // Fix prototype chain when targeting ES5
    Object.setPrototypeOf(this, ApiServiceError.prototype);
  }
}

export function isApiServiceError(err: unknown): err is ApiServiceError {
  return (
    err instanceof ApiServiceError ||
    (typeof err === 'object' &&
      err !== null &&
      (err as any).name === 'ApiServiceError' &&
      typeof (err as any).title === 'string' &&
      typeof (err as any).detail === 'string')
  );
}
