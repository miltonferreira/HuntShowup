// var dataNews = localStorage.getItem('news');

// dataNews = JSON.parse(dataNews);    // converte para JSON

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

// rota para carregar e salvar arquivos
function getFirebaseRef(path){

    return firebase.database().ref(path);
}

// ler o JSON de arquivos no firebase realtime database
function readFiles(){

    this.getFirebaseRef().on('value', snapshot => {

        snapshot.forEach(snapshotItem => {

            let key = snapshotItem.key;         //key é o nome da lista
            let data = snapshotItem.val();
            
            if(key == "news"){
                data.forEach(item => {
                    news.push(item);              // add a data no JSON
                });
            }
            

        })

        console.log(news);

        showNews(); // depois de carregar os dados mostra a noticia
        
    });

}

function showNews() {

    let valor = document.querySelector('#id_news').value;   // pega o id da noticia no html

    let dataNews = news[valor];

    document.querySelector('title').innerHTML = `${dataNews.titulo}`;

    let li = document.createElement('li');

    li.innerHTML = `
            
            <div class="list-group-item">
                <p class="new-date">${this.convertToDate(dataNews.timestamp)}</p>
                <img src="${dataNews.foto}" alt="">
                <h1>${dataNews.titulo}</h1>
                
                    
            </div>
        `;

            // <p>${dataNews.texto}</p>

    document.querySelector('.todo').append(li);

}

function convertToDate(time){

    data = new Date(time * 1000);   // converte para milliseconds, somente -> new Date() <- pega a data do PC
    date = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    hours = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    return date + " - " + hours;
}

connectFirebase();  // credenciais para conectar ao firebase
readFiles();