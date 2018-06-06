<template>
    <SmartForm title="New ticket" :operation="operation" :valid="valid">
        <FormInput name="title" v-model="title" placeholder="Short description (max 100 chars)"
            maxlength="100" required/>
        <FormInput type="textarea" name="description" placeholder="Describe your problem in details"
            v-model="description" rows="4" />
        <template slot="actions">
            <router-link tag="button" :to="{name: 'tickets'}" class="secondary">
                Go back
            </router-link>
            <button type="submit" :disabled="!valid">
                Send ticket
            </button>
        </template>
    </SmartForm>
</template>

<script>
    import PersistantData from '../mixins/PersistantData.js'
    export default {
        mixins: [
            PersistantData('NewTicket', [
                'title',
                'description',
            ]),
        ],
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
                await this.$fetch('tickets/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.title,
                        description: this.description,
                        user: this.$store.getters.user
                    }),
                })
                this.title = this.description = ''
            },
        },
    }

</script>
