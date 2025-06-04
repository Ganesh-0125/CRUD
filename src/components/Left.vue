<template>
    <div class="!pt-10">
        <div class="flex items-center rounded-lg !mb-2">
            <input type="text" v-model="search" placeholder="Search employee"
                class="bg-white h-[35px] !text-xl text-gray-950 font-extrabold !px-2 w-full border-2 border-gray-500 rounded-lg" />
        </div>

        <Table height="550" border :columns="columns" :data="filteredEntries"
            class="!border-gray-500 border-2 cursor-pointer text-left rounded-lg">
            <template #name="{ row, index }">
                <div class="flex justify-between" @mouseenter="hoveredRow = index" @mouseleave="hoveredRow = null">
                    <strong @click="viewEntry(index)" class="cursor-pointer" :class="{
                        'text-blue-500': store.viewedIndex === index,
                        'hover:text-pink-500': hoveredRow === index && store.viewedIndex !== index,
                    }">
                        {{ row.name }}
                    </strong>

                    <div v-show="hoveredRow === index" class="text-2xl flex items-center justify-center gap-x-3 w-auto">
                        <Icon type="md-create" @click="editEntry(index)" class="cursor-pointer" />
                        <Icon type="md-trash" @click="confirmDelete(index)" class="cursor-pointer" />
                    </div>
                </div>
            </template>
        </Table>

        <Modal v-model="modal" title="Confirm Deletion" @on-ok="deleteEntry" @on-cancel="cancel">
            <p>Are you sure you want to delete this entry?</p>
        </Modal>
    </div>
</template>

<script>
import { useEntryStore } from '@/stores/entryStore';
import { Icon } from 'view-ui-plus';

export default {
    components: { Icon },
    data() {
        return {
            store: useEntryStore(),
            modal: false,
            deleteIndex: null,
            search: '',
            hoveredRow: null,
            columns: [{ title: 'Name', key: 'name', slot: 'name' }],
        };
    },
    computed: {
        filteredEntries() {
            return this.search
                ? this.store.entries.filter((entry) =>
                    entry.name.toLowerCase().includes(this.search.toLowerCase())
                )
                : this.store.entries;
        },
    },
    methods: {
        confirmDelete(index) {
            this.deleteIndex = index;
            this.modal = true;
            this.search = '';
        },
        deleteEntry() {
            this.store.entries.splice(this.deleteIndex, 1);
            this.store.persistEntries();
            this.store.showMessage('Entry deleted successfully!');
            this.modal = false;
            this.store.clearForm();
            this.search = '';
        },
        cancel() {
            this.modal = false;
            this.deleteIndex = null;
        },
        editEntry(index) {
            this.store.resetEntry = { ...this.store.entries[index] };
            this.store.entry = { ...this.store.entries[index] };
            this.store.isEditing = true;
            this.store.editIndex = index;
            this.store.isViewing = false;
        },
        viewEntry(index) {
            this.store.entry = { ...this.store.entries[index] };
            this.store.isViewing = true;
            this.store.isEditing = false;
            this.store.viewedIndex = index;
        },
    },
};
</script>

<style scoped>
::v-deep(.ivu-table th) {
    font-size: 1.4rem;
    font-weight: 800;
    color: rgb(117, 119, 119);
    background-color: white;
}

::v-deep(.ivu-table td) {
    font-size: 1.1rem;
}
</style>