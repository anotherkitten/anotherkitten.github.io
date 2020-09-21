export class Save {
  [key: string]: any;
}

export interface Saveable {
  save(): Save;
  load(data: Save): void;
}

export class SaveFile {
  [key: string]: Save;
}