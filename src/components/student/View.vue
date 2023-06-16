<script setup>
import { RouterLink,useRoute } from 'vue-router';
import useStudent from '../../composables/studentApi';
import { onMounted } from 'vue';

const {studentData,error,getSingleStudent} = useStudent();

// get id from url parameter to use useRoute.
const route = useRoute()
onMounted(() => {
    getSingleStudent(route.params.id)
});
</script>

<template>
    <div>
        <div class="bg-orange-600 p-4 grid grid-cols-9">
            <div class="col-span-full">
                <h1 class="text-3xl font-bold text-center text-white">
                    View Students
                </h1>
            </div>
        </div>
        <table class="table-auto border w-full">
            <thead class="border bg-black text-white">
                <tr>
                    <th class="text-center p-2">S.No</th>
                    <th class="text-left">Name</th>
                    <th class="text-center">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center p-2">{{ studentData.id }}</td>
                    <td class="text-left">{{ studentData.stuname }}</td>
                    <td class="text-center">{{ studentData.email }}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-center">
            <RouterLink :to="{name:'list'}">
                <button class="rounded-none w-40 p-1 text-white bg-gray-500">Back</button>
            </RouterLink>
        </div>
        
        
    </div>
</template>

<style scoped>
</style>