
let twitch = [];

let news = [];

function connectFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCRRX9P8hjt-NUbrSXaZxZNgPwXiTXhgkc",
        authDomain: "hunt-showup.firebaseapp.com",
        databaseURL: "https://hunt-showup.firebaseio.com",
        projectId: "hunt-showup",
        storageBucket: "hunt-showup.appspot.com",
        messagingSenderId: "485579818827",
        appId: "1:485579818827:web:c5b99cb45f98d824ca0ace",
        measurementId: "G-GM82QC4B8K"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

function renderTwitch(){

    streamer = twitch[0].streamer;

    var embed = new Twitch.Embed("twitch-embed", {
        width: 440,
        height: 340,
        channel: twitch[0].streamer,
        layout: "video",
        autoplay: true,
        // only needed if your site is also embedded on embed.example.com and othersite.example.com 
        parent: ["embed.example.com", "othersite.example.com"]
    });

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        var player = embed.getPlayer();
        player.pause();
    });

    

}

// let z = getComputedStyle(document.querySelector('.wrap a'), ':before');

var graphElem = document.querySelectorAll('.wrap a');

for(let q of graphElem){

    q.addEventListener('mouseover', function (event) {
        q.setAttribute('class', 'show');
    });
    
    q.addEventListener('mouseleave', function (event) {
        q.setAttribute('class', 'hide');
    });

}

// rota para carregar e salvar arquivos
function getFirebaseRef(path){

    return firebase.database().ref(path);
}

// ler o JSON de arquivos no firebase realtime database
function readFiles(){

    this.getFirebaseRef().on('value', snapshot => {

        // this.listFilesEl.innerHTML = '';    // limpa caso tenha alguma info na tela

        snapshot.forEach(snapshotItem => {

            let key = snapshotItem.key;         //key é o nome da lista
            let data = snapshotItem.val();

            if(key == "twitch"){
                data.forEach(item => {
                    twitch.push(item);              // add a data no JSON
                });
            }

            if(key == "news"){
                data.forEach(item => {
                    news.push(item);              // add a data no JSON
                });
            }
            

            // console.log(key, data);
            
            // se o arquivo tem o type mostra o arquivo para o usuario
            // if(data.type){
            //     this.listFilesEl.appendChild(this.getFileView(data, key));
            // }

        })

        // console.log(news);
        
        renderNews();       //chama novamente função atualizada com o novo valor
        renderTwitch();       //chama novamente função atualizada com o novo valor
        
    });

}

function renderNews() {
    
    // document.querySelector('.news-container').innerHTML = ''; //limpa a lista para não repetir quando add nova tarefa

    news.forEach(task => {

        let li = document.createElement('div');
        li.className = "news";

        li.innerHTML = `
                
                    <a href="news.html" target="_blank">
                        <picture>
                            <img src="${task.foto}" alt="">
                            <h4 class="news-title">${task.titulo}</h4>
                        </picture>
                            <hr>
                            <h6>${this.convertToDate(task.timestamp)}</h6>
                    </a>
                
            `;


        li.querySelector('a').addEventListener('click', e => {
            dataNews = task;
            localStorage.setItem("news", JSON.stringify(task)); // converte para string
        });

        document.querySelector('.news-container').append(li);

    });

}

function convertToDate(time){

    data = new Date(time * 1000);   // converte para milliseconds, somente -> new Date() <- pega a data do PC
    date = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    hours = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    return date + " - " + hours;
}

connectFirebase();  //
readFiles();


//console.log(getComputedStyle(document.querySelector('.wrap a'), ':before').getPropertyValue('z-index'));
