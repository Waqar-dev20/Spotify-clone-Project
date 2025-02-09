// Adding functionality to Hamburger
document.getElementById("h12").addEventListener("click",()=>{
    document.getElementById("h13").classList.add("transition","bg-color-left","le-bo-he")
    document.getElementById("h13").classList.remove("position")
})
document.querySelector(".close").addEventListener("click",()=>{
    document.getElementById("h13").classList.remove("transition","bg-color-left")
    document.getElementById("h13").classList.add("position")
})
function formatTime(seconds) {
    // Ensure seconds is rounded to the nearest integer
    seconds = Math.round(seconds);
    
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    
    // Ensure two-digit format
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = secs.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}



// Fetching songs
let currentSong = new Audio();
let songs;
async function getsongs() {
    let a = await fetch("http://192.168.100.111:3000/Nasheeds/")
    let b= await a.text()
    console.log(b)
    let div = document.createElement("div")
    div.innerHTML=b
    let as =div.getElementsByTagName("a")
    console.log(as)
    songs=[]
   for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if(element.href.endsWith("4a")){
        songs.push(element.href.split("Nasheeds/")[1].split(".m4a")[0])
    }
   }
   return songs
}
function playMusic(para,pause=false){
    // let audio = new Audio("Nasheeds/" + para + ".m4a")
    currentSong.src="Nasheeds/" + para + ".m4a"
    if(!pause){
        currentSong.play()

        play.src="img/pause.svg"
    }
    document.querySelector(".song-info").innerHTML= decodeURI(para)
    document.querySelector(".songtime").innerHTML="00:00"
}
async function main() {
    songs = await getsongs()
    playMusic(songs[0],true)
    console.log(songs)
    let songUl = document.querySelector(".songs-playlists").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML + `
         <li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="songinfor">
                               <div>${song.replaceAll("%20"," ")}</div>
                               <div></div>
                            </div>
                            <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="img/play.svg" alt="">
                        </div> </li>` }
    // Attatch an eventlistner to each song
    Array.from(document.querySelector(".songs-playlists").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
    console.log(e.querySelector(".songinfor").firstElementChild.innerHTML)
    playMusic(e.querySelector(".songinfor").firstElementChild.innerHTML)
        })
    })
   }
// Attatch an eventlistner to previous,play and next
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src="img/pause.svg"
    }
    else{
        currentSong.pause()
        play.src="img/play.svg"
    }
    })
// listen for timeupdate event
currentSong.addEventListener("timeupdate",()=>{
console.log(currentSong.currentTime,currentSong.duration)
document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%"
})

// add an eventlistner to seekbar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent =(e.offsetX/e.target.getBoundingClientRect().width)*100
    document.querySelector(".circle").style.left= percent + "%"
    currentSong.currentTime= ((currentSong.duration)*percent)/100
})
// add an event listener to next btn
next.addEventListener("click",()=>{
    console.log("next clicked")
    let index= songs.indexOf(currentSong.src.split("Nasheeds/")[1].split(".m4a")[0])
    let songleng= (songs.length)-1
      if(((songs.length)-1) >=(index+1) ){
    playMusic(songs[index+1])
      }    
      else{
    playMusic(songs[0])
      }    
})
// add an event listener to previous btn
previous.addEventListener("click",()=>{
    console.log("previous clicked")
    let index= songs.indexOf(currentSong.src.split("Nasheeds/")[1].split(".m4a")[0])
      if((index-1) >= 0){
    playMusic(songs[index-1])
      }   
      else if(index==0){
        playMusic(songs[(songs.length)-1])
          }  })
          plavol.addEventListener("change",(e)=>{
            currentSong.volume= parseInt(e.target.value)/100
          })
          vicon.addEventListener("click",(e)=>{
            if(e.target.src.includes("img/volume.svg")){
                e.target.src="img/mute.svg"
                currentSong.volume=0
            }
            else{
                 e.target.src="img/volume.svg"
                 currentSong.volume= 1.0
            }
          })

main()