<script setup>
import { RouterLink } from 'vue-router'
import { PencilIcon,TrashIcon,EyeIcon,UsersIcon,PlusIcon } from '@heroicons/vue/24/solid'
import useStudent from '../../composables/studentApi';
import { onMounted } from 'vue';

const { studentData, error, getAllStudent,destroyStudent,statusCode } = useStudent();
onMounted(getAllStudent)
const deleteStudent = async(id) =>{
    let a = confirm("Are you sure?");
    if(a){
        await destroyStudent(id);
        await getAllStudent();
    }else{
        return false;
    } 
}

</script>

<template>
    <div>
        <div class="bg-orange-600 p-4 grid grid-cols-9">
            <div class="col-span-8 text-center">
                <h1 class="text-3xl font-bold text-center text-white">
                    Students List
                </h1>
            </div>
            <div class="col-span-1 text-right">
                <RouterLink :to="{name:'add'}" class="text-right">
                    <button class="rounded p-1 bg-blue-500 text-white"><UsersIcon class="h-5 w-6 text-white-500 inline"/><PlusIcon class="h-5 w-6 text-white-500 inline"/></button>
                </RouterLink>
            </div>
        </div>
        
        <div class="text-center font-bold text-red-500 bg-red-200 text-xl mt-4 p-3" role="alert" v-if="error">{{ error.message }}</div>
        <table class="table-auto border w-full" v-else-if="studentData">
            <thead class="border bg-black text-white">
                <tr>
                    <th class="text-center p-2">S.No</th>
                    <th class="text-left">Name</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({stuname,email,id},i) in studentData" :key="id">
                    <td class="text-center p-2">{{ ++i }}</td>
                    <td class="text-left">{{stuname}}</td>
                    <td class="text-center">{{email}}</td>
                    <td class="text-center">
                        <RouterLink :to="{name:'view', params:{id:id}}">
                            <EyeIcon class="h-5 w-6 text-blue-500 inline cursor-pointer"/>
                        </RouterLink>
                        
                        <RouterLink :to="{name:'edit', params:{id:id}}">
                            <PencilIcon class="h-5 w-6 ml-3 mr-3 text-green-800 inline cursor-pointer" />
                        </RouterLink>
                    
                        <TrashIcon class="h-5 w-6 text-red-500 inline cursor-pointer"  @click="deleteStudent(id)"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-center font-bold text-red-500 bg-red-200 text-xl mt-4 p-3" role="alert" v-if="statusCode===200">Deleted successfully</div>

    </div>
</template>

<style scoped>
</style>