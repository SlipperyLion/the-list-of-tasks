import axios_instance from "./axios.ts";


async function getList(id: number) {
    await axios_instance.get(`/lists/${id}`);
}


export default getList;