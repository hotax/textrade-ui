<template>
    <main class="faq">
        <h1>Frenquently Asked Questions</h1>
        <div class="error" v-if="error">
            Can't load the questions
        </div>
        <section class="list">
            <article v-for="question of questions">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>
        </section>
        <Loading v-if="loading" />
    </main>
</template>

<script>
    export default {
        data() {
            return {
                questions: [],
                error: null,
                loading: false,
            }
        },
        created() {
            this.loading = true
            this.$fetch('questions')
                .then(result => {
                    this.questions = result
                    this.loading = false
                })
                .catch(e => {
                    // this.error = e
                    this.loading = false
                })
        },
    }
</script>