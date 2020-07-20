<template>
  <div >
  <v-row>
  <v-col style="margin-left:0px;" cols='8'>
    <v-row style="margin-top:10px;margin-bottom:10px;">
    <v-col cols='5'>
      <base-material-card  color="#08182b" style="margin-left:10px;" icon="mdi-calendar"
      title2="Upcoming Events & Podcast">
      
        <div style="padding:0.25vh;margin-left:10px;overflow-y: scroll; max-height: 57vh;">
        <div style= 'margin-top:5px;border-bottom:thin solid' v-for='item in upcomingEvents '>
         <a  style=" text-decoration:none;" :href="item.link" target="_blank">
        <v-container>
         <v-row style='padding:0px;width:100%'> 
           <v-col xl='2'lg='2' md='4'>
          <h3 style='font-size:18px;'>{{item.splitDate[2]}}</h3>
          <h1 style='font-size:25px;'>{{item.splitDate[1]}}</h1>
          </v-col>
          <v-col xl='10'lg='10' md='8'> 
          <h3 style='font-size:15px;' >{{item.title}}</h3>
          </v-col>
          
         </v-row> 
         </v-container>
        </a>
        </div>
        
        </div>
      </base-material-card>
      
    </v-col>
   
    <v-col cols='7'>
      <base-material-card color="#08182b"
      title2="Finance Books & Journals" >
    
    <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-graph</v-icon>Finance Books & Journals
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-book</v-icon>Recent Economic Research
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs" style='height:55vh;margin-bottom:0px' class="transparent">
            <v-tab-item v-for="n in 2" :key='n'>
              <div style="padding:0.5vh;overflow-y: scroll;height:55vh;margin-left:10px;">
                
        <div v-if='n==1' style= 'margin-top:10px;border-bottom:thin solid' v-for='item in econResearch'>
        <a  style="text-decoration:none;" :href="item.link" target="_blank">
        <h3>{{item.title}}</h3>
        <p>{{item.summary}}</p>
         </a>
        </div>
       
      </div>
            </v-tab-item>
          </v-tabs-items>
      </base-material-card>
    </v-col>
    </v-row>  
    <v-row style = 'margin-top:10px;'>
    <v-col cols='5'>
      
      <base-material-card  color="#08182b"  style="font-size:10px;height:30vh;" title2='Bloomberg Live Streams' icon='mdi-cast'>
        <div style="margin-left:10px;">
        
       <v-container>
    <v-row>
       <v-col cols='6' style='align-items:center;'>
        <a :href="'https://www.bloomberg.com/live/us'" target="_blank" style="color:white; text-decoration:none;">  
        <v-btn
            
            style='height:3vh;margin-bottom: 20%;color: white;justify:center;width:100%;'
            color="rgb(17, 25, 69)"
            class="mr-4"
            
            justify='center'
          >US Stream</v-btn></a>
    
          <a :href="'https://www.bloomberg.com/live/europe'" target="_blank" style="color:white;text-decoration:none;">
          <v-btn
          
            class="mr-4"
            style='height:3vh;width:100%;color: white;justify:center;width:100%;'
            color="rgb(17, 25, 69)"
          >Europe Stream</v-btn></a>
    
  
   
      </v-col>
      <v-col cols='6' style='align-items:center;'>
 
   <a :href="'https://www.bloomberg.com/live/asia'" target="_blank" style="color:white; text-decoration:none;">
    <v-btn
            
            style='height:3vh;margin-bottom:20%;color: white;justify:center;width:100%;'
            color="rgb(17, 25, 69)"
            class="mr-4"
          >Asia Stream</v-btn></a>
  
   <a :href="'https://www.youtube.com/watch?v=dp8PhLsUcFE'" target="_blank" style="color:white; text-decoration:none;">
    <v-btn
            style='height:3vh;color: white;justify:center;width:100%;'
            color="rgb(17, 25, 69)"
            class="mr-4"
          >Global Stream</v-btn></a>
    
        </v-col>
    
    </v-row>
    </v-container>
        </div>
      </base-material-card>
    </v-col>
    <v-col cols='4'>
      <base-material-card   color="#08182b" style="height:30vh;"  icon="mdi-laptop"
      title2="BMO Finance Lab Software">
    
      <div style=";margin-left:10px;">
     
        <v-row style='margin-left:2vw;justify-content:center'>
       <v-col cols='12' style='align-items:center;'>
        <v-row>  
          <a :href="'https://www.capitaliq.com/ciqdotnet/login.aspx'" target="_blank" style="color:white; text-decoration:none;justify:center;width:80%;">
        <v-btn
            
            style='height:3vh;margin-bottom: 5%;color: white;justify:center;width:100%;'
            color="rgb(17, 25, 69)"
            class="mr-4"
            
            justify='center'
          > Capital IQ</v-btn></a>
    
        </v-row>
        <v-row>
          <a :href="'https://login.factset.com/'" target="_blank" style="color:white; text-decoration:none;justify:center;width:100%;">
          <v-btn
          
            class="mr-4"
            style='height:3vh;margin-bottom: 5%;width:80%;color: white;justify:center;;'
            color="rgb(17, 25, 69)"
          >FactSet</v-btn></a>
        </v-row>
        <v-row>
          <a :href="'https://portal.bloombergforeducation.com/login'" target="_blank" style="color:white; text-decoration:none;justify:center;width:100%;">
          <v-btn
          
            class="mr-4"
            style='height:3vh;width:80%;color: white;self-align:center;'
            color="rgb(17, 25, 69)"
          >Bloomberg Market Concepts</v-btn></a>
        </v-row>
  
   
      </v-col>
    
    </v-row>

      </div>
      </base-material-card>
    </v-col>
    </v-row>
    
    
  </v-col>
<v-col cols='4' style='margin-top:20px;'>
  
   <base-material-card title='The Uptick' icon="mdi-glasses" color="#08182b" style="align:center; padding: 20px;height:98vh;" >
  
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
import * as Cookies from "js-cookie";
const base_link = Cookies.get("link");
export default {
  name: "Resources",
  components: {
  },
  data() {
    return {
      tabs:2,
      tabs2:2,
      uptick:null,
      upcomingEvents: null,
      econResearch: null,
    };
  },
  
  methods:
  {
    getUptick(){
      Axios.get(base_link + 'info/resources/')
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