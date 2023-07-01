import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    const response = await fetch('https://demo.softswiss.net/api/games/allowed_desktop');
    return await response.json();
});

const gamesSlice = createSlice({
    name: 'games',
    initialState: { games: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            // .addCase(fetchGames.rejected, (state, action: PayloadAction<string | null | undefined, string, unknown, Error>) => {
            //     state.status = 'failed';
            //     state.error = action.error.message || null;
            // });
    },
});

export default gamesSlice.reducer;
