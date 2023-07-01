export interface GameState {
    games: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
