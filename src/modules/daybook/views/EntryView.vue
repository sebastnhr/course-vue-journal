<template>
    <div v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
            <div>
                <button class="btn btn-danger mx-2">Borrar <i class="fa fa-trash-alt"></i> </button>
                <button class="btn btn-primary">Subir foto <i class="fa fa-upload"></i> </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Que sucedio hoy?" v-model="entry.text"></textarea>
        </div>
        <Fab icon="fa-save"/>
        <img src="https://images.unsplash.com/photo-1633179895302-b59133548261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80" alt="Entry-picture" class="img-thumbnail">
    </div>
</template>

<script>
import getDayMonthYear from '../helpers/getDayMonthYear';

import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            entry: {
                text: ''
            }
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day(){
            const {day} = getDayMonthYear(this.entry.date);
            return day;
        },
        month(){
            const {month} = getDayMonthYear(this.entry.date);
            return month;
        },
        yearDay(){
            const {yearDay} = getDayMonthYear(this.entry.date);
            return yearDay;
        }
    },
    methods: {
        loadEntry(){
            const entry = this.getEntryById(this.id);
            if(!entry){ return this.$router.push({name: 'no-entry'})}
            this.entry = entry;
            
        }
    },
    created() {
        this.loadEntry();
    },
    watch: {
        id(){
            this.loadEntry();
        }   
    }
}
</script>

<style lang="scss" scoped>
    textarea{
        font-size: 20px;
        border: none;
        height: 100%;
        &:focus{
            outline: none;
        }
    }
    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 1.2);
    }
</style>