<template>
  <div>
  <v-row>
  <v-col style="margin-left:0px;" cols='9'>
    <v-col cols='12'>
      <v-card style="min-height:5vh;max-height:7vh;" >
        <v-row style='margin-left:0px;justify:center;'>
          <v-col cols ='3'>
            <h2> Bloomberg Streams</h2>
          </v-col>
          <v-col cols ='2'>
          <v-btn
         
          style="color: white;"
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/us'" target="_blank" style="color:white; text-decoration:none;">Bloomberg US Stream</a></v-btn>
        </v-col>
        <v-col cols = '2'>
        <v-btn
          
          style=""
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/europe'" target="_blank" style="color:white;text-decoration:none;">Bloomberg Europe Stream</a></v-btn>
        </v-col>
        <v-col cols = '2'>
        <v-btn
          
          small
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/asia'" target="_blank" style="color:white; text-decoration:none;">Bloomberg Asia Stream</a></v-btn>
        </v-col>
        <v-col cols = '2'>
          <v-btn
          small
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.youtube.com/watch?v=dp8PhLsUcFE'" target="_blank" style="color:white; text-decoration:none;">Bloomberg Global Stream</a></v-btn>
        </v-col>

      </v-row>
      </v-card>
    </v-col>
    <v-row style="margin-top:10px;margin-bottom:10px;">
    <v-col cols='4'>
      <base-material-card  color="#08182b" style="margin-left:10px;height:65vh;">
      <template v-slot:heading>
      <div class="display-1 font-weight-light">Upcoming Events & Podcasts</div>
      </template>
        <div style="padding:0.5vh;margin-left:10px;overflow-y: scroll; max-height: 85%;">
        <div style= 'margin-top:5px;border-bottom:thin solid' v-for='item in upcomingEvents'>
         <a  style=" text-decoration:none;" :href="item.link" target="_blank">
          <h3>{{item.title}}</h3>
          <p>{{item.summary}}<br>
          {{item.published}}</p>
        </a>
        </div>
        
        </div>
      </base-material-card>
    </v-col>
    <v-col cols='4'>
      <base-material-card  color="#08182b" style="height:65vh;" >
      <template v-slot:heading>
      <div class="display-1 font-weight-light">Recent Economic Research</div>
    </template>
      <div style="padding:0.5vh;overflow-y: scroll; max-height: 85%;margin-left:10px;">
                
        <div style= 'margin-top:5px;border-bottom:thin solid' v-for='item in econResearch'>
        <a  style="text-decoration:none;" :href="item.link" target="_blank">
        <h3>{{item.title}}</h3>
        <p>{{item.summary}}</p>
         </a>
        </div>
       
      </div>
      </base-material-card>
    </v-col>
    <v-col cols='4'>
      <base-material-card color="#08182b" style="height:65vh;" >
      <template v-slot:heading>
      <div class="display-1 font-weight-light">FinTech BuzzFeed</div>
    </template>
        <div style="margin-left:10px;">
        </div>
      </base-material-card>
    </v-col>
    </v-row>  
    <v-row >
    <v-col cols='4'>
      <v-card  style="height:20vh;">
      <template v-slot:heading>
      <div class="display-2 font-weight-light">Trade</div>
    </template>
        <div style="padding:2vh;margin-left:10px;">
        <h2> Sandbox Documentation</h2>
        </div>
      </v-card>
    </v-col>
    <v-col cols='4'>
      <v-card style="height:20vh;" >
      <template v-slot:heading>
      <div class="display-2 font-weight-light">Trade</div>
    </template>
      <div style="padding:2vh;margin-left:10px;">
        <h2>BMO Finance Lab Software</h2>
      </div>
      </v-card>
    </v-col>
    <v-col cols='4'>
      <v-card   style="height:20vh;" >
      <template v-slot:heading>
      <div class="display-2 font-weight-light">Trade</div>
    </template>
        <div style="padding:2vh;margin-left:10px;">
        <h2>Finance Books & Journal Articles</h2>
        </div>
      </v-card>
    </v-col>
    </v-row>
    
    
  </v-col>
<v-col cols='3'>
  <v-col cols='12'>
   <base-material-card  color="#08182b" style="align:center; padding: 20px;height:100vh;" >
   <template v-slot:heading>
      <div class="display-2 font-weight-light">The Uptick</div>
    </template>
     <div style="margin-left:0px;overflow-y: scroll; max-height: 90%;">
        
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
      </base-material-card>
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
      upcomingEvents: null,
      econResearch: null,
    };
  },
  
  methods:
  {
    getUptick(){
      Axios.get('https://rcsandbox.ca/info/resources/')
        .then(Response => {
            this.uptick = Response.data.uptick.entries;
            this.econResearch = Response.data.research;
            this.upcomingEvents = Response.data.upcomingEvents;

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