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
    </main>
</template>

<script>
    export default {
        data() {
            return {
                questions: [{
                    title: 'title1',
                    content: 'content of question 1'
                }, {
                    title: 'title2',
                    content: 'content of question2'
                }],
                error: null,
            }
        },
    }
</script>