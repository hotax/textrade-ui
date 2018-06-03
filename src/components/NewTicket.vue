<template>
    <SmartForm title="New ticket" :operation="operation" :valid="valid">
        <FormInput name="title" v-model="title" placeholder="Short description (max 100 chars)"
            maxlength="100" required/>
        <FormInput type="textarea" name="description" v-model="description" placeholder="Describe your problem in details"
        />
    </SmartForm>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
            }
        },
        computed: {
            valid() {
                return !!this.title && !!this.description
            },
        },
        methods: {
            async operation() {
                // TODO
            },
        },
    }

</script>
