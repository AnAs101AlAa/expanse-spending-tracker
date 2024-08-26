import { createSlice } from "@reduxjs/toolkit";

export const PlanerSlice = createSlice({
    name: "Planer",
    initialState: {
        id: "",
        balance: 0,
        history: [],
        packages: [],
    },
    reducers: {
        setPlaner(state, action){
            state.balance = action.payload.balance;
            state.history = action.payload.history;
            state.packages = action.payload.packages;
        },
        setId(state, action){
            state.id = action.payload;
        },
        setBalance(state, action){
            state.balance = action.payload;
        },
        addItem(state, action){
            state.history.push(action.payload);
        },
        newEvent(state, action){
            state.packages.push(action.payload);
        },
        setPacks(state, action){
            state.packages = action.payload;
        },
        resetState(state){
            state.balance = 0;
            state.history = [];
            state.packages = [];
        }
    }
});

export const { setPlaner, setBalance, addItem, deleteItem, newEvent, deleteEvent, resetState, setPacks, setId } = PlanerSlice.actions;
export default PlanerSlice.reducer;