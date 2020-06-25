<template>
  <div>
  <v-row>
  <v-col style="margin-left:0px;" cols='9'>
    <v-row style="margin-left:0px;">
    <v-col cols='4'>
      <v-card style="height:35vh;">
        <div style="margin-left:10px;">
        <h1> Sandbox Documentation</h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols='4'>
      <v-card  style="height:35vh;" >
      <div style="margin-left:10px;">
        <h1>BMO Finance Lab Software</h1>
      </div>
      </v-card>
    </v-col>
    <v-col cols='4'>
      <v-card style="height:35vh;" >
        <div style="margin-left:10px;">
        <h1>Finance Books & Journal Articles</h1>
        </div>
      </v-card>
    </v-col>
    </v-row>
    <v-col cols='12'>
      <v-card style="min-height:5vh;max-height:7vh;" >
        <v-row style='margin-left:0px;justify:center;'>
          <v-col cols ='3'>
          <v-btn
         
          style="color: white;"
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/us'" target="_blank" style="color:white; text-decoration:none;">Bloomberg US Stream</a></v-btn>
        </v-col>
        <v-col cols = '3'>
        <v-btn
          
          style=""
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/europe'" target="_blank" style="color:white;text-decoration:none;">Bloomberg Europe Stream</a></v-btn>
        </v-col>
        <v-col cols = '3'>
        <v-btn
          
          small
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/asia'" target="_blank" style="color:white; text-decoration:none;">Bloomberg Asia Stream</a></v-btn>
        </v-col>
        <v-col cols = '3'>
          <v-btn
          small
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.youtube.com/watch?v=dp8PhLsUcFE'" target="_blank" style="color:white; text-decoration:none;">Bloomberg Global Stream</a></v-btn>
        </v-col>

      </v-row>
      </v-card>
    </v-col>
    <v-col cols='12'>
      <v-card style="height:40vh;" >
        Bashaar
      </v-card>
    </v-col>
  </v-col>
<v-col cols='3'>
  <v-col cols='12'>
   <v-card  style="align:center; padding: 20px; min-height:85vh;max-height:90vh;" >
     <div style="margin-left:0px;overflow-y: scroll; max-height: 80vh;">
        <h1> The Uptick </h1>
        
        <div style="padding:10px;"  v-for="article in uptick">
          <a  style=" text-decoration:none;" :href="article.link" target="_blank">
          <div> 
          <img style = 'width:100%;height:20%' :src='article.media_content[0].url' alt="Italian Trulli">
          </div>
          <h2> {{article.title}}</h2>
          <h3>{{article.summary}}</h3>
          <p> {{article.published}}</p>
          </a>
        </div>
      
      </div>
      </v-card>
  </v-col>
</v-col>
</v-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "Resources",
  components: {
  },
  data() {
    return {
      uptick:null,
    };
  },
  
  methods:
  {
    getUptick(){
      Axios.get('https://rcsandbox.ca/info/resources/')
        .then(Response => {
            this.uptick = Response.data.entries;
            console.log(this.uptick);
        },
        )
    },
  },
  mounted(){
    this.getUptick();
  },
};

</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
}

.bgimg {
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 25px;
}

.topleft {
  position: absolute;
  top: 0;
  left: 16px;
}

.bottomleft {
  position: absolute;
  bottom: 0;
  left: 16px;
}

.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: black;
}

hr {
  margin: auto;
  width: 40%;
}
</style>