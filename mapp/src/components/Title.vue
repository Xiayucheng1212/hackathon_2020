<template>
<h1 class='ti'>{{title}}</h1>
</template>

<script>
export default {
    name: 'ti',
    // data() {
    //     return {
    //         title: 'hello!!my boddy'
    //     }
    // }
    props: {
        title: {
            type: String, //給我一個String 的 title
            required: true //一定要給
        }
    }
}
</script>

/* scope 控制他的區域 */

<style scoped>
h1.ti {
    color: orange;
}
</style>
