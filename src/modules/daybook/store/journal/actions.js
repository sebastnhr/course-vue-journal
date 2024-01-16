import journalApi from "@/api/journalApi";

// export const myAction = async ({commit}) => {}
export const loadEntries = async ({commit}) => {
    const { data } = await journalApi.get('/entries.json');
    
    if(!data){
        commit('setEntries', []);
        return ;
    }

    const entries = [];
    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }
    
    commit('setEntries', entries);
}

export const updateEntries = async ({commit}, entry) => {
    const { id, ...dataEntry } = entry;

    await journalApi.put(`/entries/${entry.id}.json`, dataEntry);
    
    commit('updateEntry', {...entry});
}

export const createEntries = async ({commit}, entry) => {
    const {data} = await journalApi.post(`/entries.json`, entry);

    commit('addEntry', {id: data.name, ...entry});

    return data.name;
}

export const deleteEntry = async ({commit}, id) => {
    await journalApi.delete(`/entries/${id}.json`);

    commit('removeEntry', id);
}