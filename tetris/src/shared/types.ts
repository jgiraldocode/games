export type Shape = {
    x: number;
    y: number;
    color: string;
    shape: Array<Array<number>>;
}

export type Grid = Array<Array<string>>;

export enum GameStatus {
    NotStarted = 'not_started',
    Running = 'running',
    Pause = 'pause'
}