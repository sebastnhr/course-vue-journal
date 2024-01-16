import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://course-vue-journal-default-rtdb.firebaseio.com'
});

export default journalApi;