<template>
  <a
    :href="link"
    :download="name + '.png'"
    title="Download as PNG"
    style="text-decoration: none;"
  >
    🖨
  </a>
</template>

<script>
  export default {
    name: 'DownloadButton',
    props: {
      name: {
        type: String,
        default: 'chart'
      },
      link: {
        type: String,
        default: ''
      }
    }
  }
</script>
