<template>
    <div class="h-screen flex flex-col items-center !pt-16 justify-center sm:justify-start sm:pt-10">
        <Form ref="userForm" class="bg-zinc-900 w-full flex flex-col justify-center !p-10 shadow-md rounded-lg"
            @submit.prevent="validateAndSave" :model="store.entry" :rules="formValidate">
            <transition name="fade">
                <div v-if="store.message" class="bg-gray-300 text-black p-2 rounded-md text-center mb-2">
                    {{ store.message }}
                </div>
            </transition>

            <p class="text-center text-3xl font-bold text-white">
                {{ store.isEditing ? 'Edit Employee' : 'Create Employee' }}
            </p>

            <div class="flex flex-col gap-2">
                <FormItem label="Name" prop="name">
                    <Input v-model="store.entry.name" :readonly="store.isViewing" placeholder="Enter your name" />
                </FormItem>
                <FormItem label="Email" prop="email">
                    <Input v-model="store.entry.email" :readonly="store.isViewing" placeholder="Enter your e-mail"
                        type="email" />
                </FormItem>
                <FormItem label="Department" prop="department">
                    <Input v-model="store.entry.department" :readonly="store.isViewing"
                        placeholder="Enter your department" />
                </FormItem>
                <FormItem label="Phone No" prop="phoneNo">
                    <Input v-model="store.entry.phoneNo" :readonly="store.isViewing" placeholder="Enter mobile"
                        type="tel" />
                </FormItem>
            </div>

            <div class="flex gap-4 mt-2">
                <Button class="!text-xl" v-if="store.isEditing" type="success" @click="validateAndSave">Update</Button>
                <Button class="!text-xl" v-if="!store.isEditing && !store.isViewing" type="success"
                    @click="validateAndSave">Create</Button>
                <Button class="!text-xl" v-if="store.isViewing || store.isEditing" type="primary"
                    @click="createNewEntry">Create New ?</Button>
                <Button class="!text-xl" v-if="store.isEditing" type="error" @click="resetForm">Reset</Button>
            </div>
        </Form>
        <router-link to="/table"
            class="!underline text-2xl !text-white hover:!text-blue-400 !mt-3 !left-50 sm:mt-2 sm:relative sm:bottom-0">
            View Table
        </router-link>
    </div>
</template>

<script>
import { useEntryStore } from '@/stores/entryStore';

export default {
    data() {
        return {
            store: useEntryStore(),
            formValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    { validator: (rule, value, callback) => this.validateName(value, callback), trigger: 'blur' },
                ],
                email: [
                    { type: 'email', required: true, message: 'Incorrect mail format', trigger: 'blur' },
                    {
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address',
                        trigger: ['blur', 'change'],
                    },
                ],
                department: [{ required: true, message: 'The department name cannot be empty', trigger: 'blur' }],
                phoneNo: [
                    { required: true, message: "Please enter the user's mobile", trigger: 'blur' },
                    {
                        pattern: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit mobile number',
                        trigger: ['blur', 'change'],
                    },
                ],
            },
        };
    },
    methods: {
        validateAndSave() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    if (this.store.isEditing && this.store.editIndex !== null) {
                        this.store.entries[this.store.editIndex] = { ...this.store.entry };
                        this.store.isEditing = false;
                        this.store.editIndex = null;
                        this.store.showMessage('Entry updated successfully!');
                    } else {
                        this.store.entries = [{ ...this.store.entry }, ...this.store.entries];
                        this.store.showMessage('Entry created successfully!');
                    }
                    this.store.persistEntries();
                    this.store.clearForm();
                } else {
                    console.error('Form validation failed!');
                }
            });
        },
        validateName(value, callback) {
            const isDuplicate = this.store.entries.some(
                (entry, index) => entry.name === value && index !== this.store.editIndex
            );
            if (isDuplicate) {
                callback(new Error('This Name is already in use.'));
            } else {
                callback();
            }
        },
        resetForm() {
            if (this.store.resetEntry) {
                this.store.entry = { ...this.store.resetEntry };
                this.store.showMessage('Form restored with previous entry.');
            }
        },
        createNewEntry() {
            this.store.clearForm();
            this.store.isViewing = false;
            this.store.viewedIndex = null;
        },
    },
};
</script>

<style scoped>
::v-deep(.ivu-form-item label) {
    font-size: 1.2rem;
    color: white;
}

::v-deep(.ivu-input-default) {
    font-size: 1.2rem;
    color: black;
}

::v-deep(.ivu-input::placeholder) {
    color: rgb(121, 113, 113);
}
</style>