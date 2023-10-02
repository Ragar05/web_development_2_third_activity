export class HttpPetitionMock<T> {
  public run = async (ms: number, fn: (...args: any[]) => T): Promise<T> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        return resolve(fn());
      }, ms)
    );
  };
}
