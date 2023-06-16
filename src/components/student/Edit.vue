<script setup>
import { RouterLink,useRoute } from 'vue-router';
import { ref,reactive,onMounted } from 'vue';
import useStudent from '../../composables/studentApi';
// import { PencilIcon,TrashIcon,EyeIcon,UsersIcon,PlusIcon } from '@heroicons/vue/24/solid';
const {studentData, error, getSingleStudent,updateStudent } = useStudent();
const {params} = useRoute();
onMounted(() => {
    getSingleStudent(params.id)
});

const handleEditStudent = async()=>{
    await updateStudent(params.id,studentData.value)
}
</script>

<template>
    <div>
        <div class="bg-purple-600 p-4 grid grid-cols-9">
            <div class="col-span-9 text-center">
                <h1 class="text-3xl font-bold text-center text-white">
                    Edit Students
                </h1>
            </div>
        </div>
  
        <div class="mt-3 grid grid-cols-6 gap-4">
            <div class="col-start-2 col-span-4">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleEditStudent">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Name" v-model="studentData.stuname">
                        <input id="id" type="hidden" placeholder="Enter Name" v-model="studentData.id">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter Email" v-model="studentData.email">
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update
                        </button>
                        <RouterLink :to="{name:'list'}">
                            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Back</button>
                        </RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>