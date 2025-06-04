<template>
    <div class="relative bg-cyan-900">
        <router-link to="/" class="absolute text-2xl !text-white  hover:!text-blue-400 !underline !left-10 !top-2 z-50">Back To Home</router-link>
        <!-- Table -->
            <Table height="700" :columns="columns" :data="store.entries" class="w-full font-bold !text-3xl !p-10 border-gray-500">
                <template #name="{ row }">
                    <strong>{{ row.name }}</strong>
                </template>
            </Table>
    </div>
</template>

<script>
import { useEntryStore } from "@/stores/entryStore";
export default {
    data() {
        return {
            store: useEntryStore(),
            columns: [
                { title: "Name", key: "name" },
                { title: "Email", key: "email" },
                { title: "Phone No", key: "phoneNo" },
                { title: "Department", key: "department" },
            ],
        };
    },
};
</script>
<style scoped>
/* Target the table header row cells */
::v-deep(.ivu-table th)  {
  font-size: 1.4rem; /* or text-4xl in Tailwind */
  font-weight: 800;
  color: rgb(117, 119, 119);
  background-color: white; /* optional: dark cyan background */
}
::v-deep(.ivu-table td){
    font-size:1.2rem;
}
</style>
