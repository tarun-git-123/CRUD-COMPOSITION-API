import { ref } from 'vue'
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'

export default function useStudent(){
    const url = "http://localhost:3333/students/"
    const studentData = ref([]);
    const error = ref(null);
    const statusCode = ref(null);
    const router = useRouter()
    const route = useRoute()
    // get All student data
    const getAllStudent = async() =>{
        studentData.value=[];
        error.value=null;
        try {
            const res = await axios(url);
            studentData.value = res.data;
            // console.log(res.data);
        } catch (err) {
            // console.log(err);
            error.value = err;
        }
    }

    // get single student data
    const getSingleStudent = async (id)=>{
        studentData.value=[];
        error.value=null;
        try{
            const res = await axios(url + id);
            studentData.value = res.data;
        }catch(err){
            error.value = err;
        }
    }

    // add student data
    const addStudent = async(formData)=>{
        studentData.value=[];
        error.value=null;
        try{
            const config = {
                method: 'POST',
                url:url,
                headers:{
                    'Content-Type':'application/json'
                },
                data:JSON.stringify(formData)
            }
            const res = await axios(config);
            statusCode.value = res.status;

            setTimeout(()=>{
                statusCode.value = '300';
                router.push({
                    name: 'list'
                });
            },2000);
        }catch(err){
            error.value = err;
        }
    }

    // update student data
    const updateStudent = async(id,data)=>{
        studentData.value=[];
        error.value=null;
        try{
            const config = {
                method: 'PUT',
                url:url+id,
                headers:{
                    'Content-Type':'application/json'
                },
                data:JSON.stringify(data)
            }
            const res = await axios(config);
            studentData.value = res.data;
        }catch(err){
            error.value = err;
        }
    }

    // delete student
    const destroyStudent = async(id)=>{
        studentData.value=[];
        error.value=null;
        try{
            const config = {
                method: 'DELETE',
                url:url+id,
            }
            const res = await axios(config);
            statusCode.value = res.status;
            setTimeout(()=>{
                statusCode.value = '300';
            },2000);
        }catch(err){
            error.value = err;
        }
    }

    return{
        studentData,
        error,
        statusCode,
        getAllStudent,
        getSingleStudent,
        addStudent,
        updateStudent,
        destroyStudent
    }
}