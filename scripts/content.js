chrome.runtime.onMessage.addListener(gotMessage);


function gotMessage(message,sender,sendresponse)
{


    console.log(message);
/*	
	let paragraphs = document.getElementsByTagName("p");
	
	for(elt of paragraphs)
	{
		elt.style['background-color'] = '#00CED1';
	}
*/	
	if(message.text == "GetSongInfo") {
        getSongInfo(message, sender, sendresponse);
	}
}

function TryGetSongLetrasMusBr() {
    const header = document.querySelector('.head-titleContainer');
    const lyrics = document.querySelector('.lyric-original');
    const info = { has_song: false, title:'', author:'', slides:[] };
    console.log("INFN:", header, lyrics);
    if (header && lyrics) {
        info.has_song = true;
        info.title = header.querySelector(".head-title").innerText;
        info.author = header.querySelector(".head-subtitle span").innerText;
        
        const paragrafos = lyrics.querySelectorAll("p");
        
        paragrafos.forEach(function(p) {
            info.slides.push(p.innerText);
        });
        
    }
    return (info);
}

function TryGetSongVagalume() {
    const info = { has_song: false, title:'', author:'', slides:[] };
    const header = document.getElementById("lyricContent");
    if (header) {
        info.has_song = true;
        info.title = header.querySelector("h1").innerText;
        info.author = header.querySelector("h2 > a").innerText;
        info.slides = header.querySelector("#lyrics").innerText.split('\n\n');
    }
    return info;
}

function TryGetSongLetrasMusBr2() {
    const info = { has_song: false , title:'', author:'', slides:[] };
    const header = document.querySelectorAll(".cnt-head_title")[0];
    if (header) {
        info.has_song = true;
        info.title = header.querySelector("h1").innerText;
        info.author = header.querySelector("h2").innerText;
        const paragrafos = document.querySelectorAll(".cnt-letra > p");       
        paragrafos.forEach(function(p) {
            info.slides.push(p.innerText);
        });
    }
    return info;
}

function getSongInfo(message, sender, send) {
    
    let host = window.location.host;
    
    const table = {};
    
    table['www.letras.mus.br'] = TryGetSongLetrasMusBr;
    table['www.vagalume.com.br'] = TryGetSongVagalume;
    
    console.log("HOST:"+host);
    
    console.log("function", table[host]);

    
    console.log("Getting Song Info");
 
    
    send(table[host]());   
}
