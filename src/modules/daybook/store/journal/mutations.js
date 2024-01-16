// export const myMutation = (state) => {  }
export const setEntries = (state, entries) => {  
    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
}

export const updateEntry = (state, entry) => {
    const id = state.entries.map(e => e.id).indexOf(entry.id);

    state.entries[id] = entry;
}

export const addEntry = (state, entry) => {  
    //state.entries.push(entry)
    state.entries = [entry, ...state.entries]
}

export const removeEntry = (state, id) => {
    //state.entries = state.entries.filter(e => e.id !== id);
    const entry = state.entries.findIndex(e => e.id === id);
    
    state.entries.splice(entry, 1);
}