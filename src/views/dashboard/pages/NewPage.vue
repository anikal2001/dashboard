<template>
  
</template>

<script>
import Axios from 'axios'
export default {
    name:'NewPage',
    data(){
        return{

        }
    },
    async created(){
        const response = await Axios.get('https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?%24filter=month(NEW_DATE)%20eq%207%20and%20year(NEW_DATE)%20eq%202020&fbclid=IwAR3Y105JN77DZcAqYpyj7GIEvVbltWzW1k9Cc_Mxfskyjh1dm6mVLwdkfR0')
        console.log(response)
    }
}
</script>

<style>

</style>