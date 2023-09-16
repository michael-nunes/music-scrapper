function init() {

  document.querySelector("h1").innerText= "Loading";
    
  chrome.tabs.query({active:true}, function(tabs) {
    RequestSongInfo(tabs[0].id);
    console.log("query song 2");
  });
} 

function DisplayContent(txt) {  
    document.querySelector("h1").innerText = txt;
}

function HandleResonse(response) {
    console.log(response);
    if (response !== undefined && response.has_song) {
        DisplaySongInfo(response);
        PrepareSongToDownload(response);
    }
    else {
        DisplayContent("Do not have song");
    }
}

function RequestSongInfo(tab) {
    const msg = { text : "GetSongInfo" };
    chrome.tabs.sendMessage(tab, msg, HandleResonse);    
}


function DisplaySongInfo(Song) {
    const {title, author, slides } = Song;
    document.querySelector(".title").innerText = title;
    document.querySelector(".author").innerText = author;
}

function ProcessSlideLine(Line, Max) {

    let Result = [];
    let Words = Line.split(' ');
    let CurrentLine = '';
    
    Words.forEach(function(Word) {
        if ((CurrentLine.length + Word.length + 1) < Max) {
            CurrentLine += (Word + ' ');
        }
        else {
            Result.push(CurrentLine.trim());
            CurrentLine = Word + ' ';
        }
    });
    
    CurrentLine = CurrentLine.trim();
    
    if (CurrentLine.length > 0) {
        Result.push(CurrentLine);
    }
    return (Result);
}

function PrepareSongToDownload(Song) {

    if (!Song.has_song) return;
    
    const {title, author, slides} = Song;
    
    let data = `[TITLE]\n${title}\n[AUTHOR]\n${author}\n[SLIDE]\n`;
    
    slides.forEach(function(slide) {
        slide.split('\n').forEach(function(Line){
            ProcessSlideLine(Line, 45).forEach(function(SubLine, SubLineIndex) {
                data += SubLine + '\n';
            });
        });
        data = data + "\n";
    });
    
    const letraEl = document.querySelector(".letra");
     
    letraEl.innerText = data;
    
    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,'+data;
    a.download = title + ' - ' + author + '.slg';
    a.innerText="Download";
    
    document.querySelector(".actions").appendChild(a);
}
   
document.addEventListener("DOMContentLoaded", init);
