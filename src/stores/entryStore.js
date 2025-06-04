import { defineStore } from "pinia";

export const useEntryStore = defineStore("entryStore", {
    state: () => ({
        entries: JSON.parse(localStorage.getItem("entries")) || [],
        entry: {
            name: "",
            email: "",
            department: "",
            phoneNo: "",
        },
        resetEntry: null,
        isEditing: false,
        editIndex: null,
        isViewing: false,
        viewedIndex: null,
        message: "",
    }),
    actions: {
        persistEntries() {
            localStorage.setItem("entries", JSON.stringify(this.entries));
        },
        clearForm() {
            this.entry = {
                name: "",
                email: "",
                department: "",
                phoneNo: "",
            };
            this.resetEntry = null;
            this.isEditing = false;
            this.editIndex = null;
        },
        showMessage(msg) {
            this.message = msg;
            setTimeout(() => {
                this.message = "";
            }, 3000);
        },
    },
});
