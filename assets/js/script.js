
let twitch = [];

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

function renderPage(){

    // document.querySelector('title').innerHTML = `${twitch[0].streamer}`;

    streamer = twitch[0].streamer;

    // var streamer = "fox3dfx";

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

            let key = snapshotItem.key;         //key é o nome da lista nesse caso noticias
            let data = snapshotItem.val();

            data.forEach(item => {
                twitch.push(item);              // add a data no JSON
            });

            console.log(key, data);
            
            // se o arquivo tem o type mostra o arquivo para o usuario
            // if(data.type){
            //     this.listFilesEl.appendChild(this.getFileView(data, key));
            // }

        })
        
        renderPage();       //chama novamente função atualizada com o novo valor
        

    });

}

connectFirebase();  //
readFiles();


//console.log(getComputedStyle(document.querySelector('.wrap a'), ':before').getPropertyValue('z-index'));
