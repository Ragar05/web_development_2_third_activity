export class InMemoryService {
  private static _instance: InMemoryService;

  private constructor() {}

  public static getInstance() {
    if (!this._instance) {
      this._instance = new InMemoryService();
    }
    return this._instance;
  }

  saveData<T>(collectionName: string, data: T): void {
    localStorage.setItem(collectionName, JSON.stringify(data));
  }

  getData<T>(collectionName: string): T | null {
    const json = localStorage.getItem(collectionName);

    if (!json) {
      this.saveData(collectionName, []);
      return [] as T;
    } else {
      return this.tryParseToObject(json);
    }
  }
  
  deleteData(collectionName: string): void {
    localStorage.removeItem(collectionName);
  }

  private tryParseToObject<T>(json: string | null): T | null {
    try {
      return JSON.parse(json as string) as T;
    } catch (error) {
      return null;
    }
  }
}
