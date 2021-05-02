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
                Object.values(data).forEach(item => {
                    news.push(item);              // add a data no JSON
                });
                
            }

        })

        orderByTimeStamp(news); // orderna as posiçoes dos elementos pelo timestamp
        renderNews();           // chama novamente função atualizada com o novo valor

    });

}

function orderByTimeStamp(array){
    //news.reverse();         // inverte as posições do array

    // empurra o maior timestamp pra frente do array
    array.sort(function (a, b) {
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
}

function renderNews() {
    
    document.querySelector('.container').innerHTML = ''; //limpa a lista para não repetir quando add nova tarefa
    
    news.forEach(task => {

        let li = document.createElement('div');
        li.className = "news";

        li.innerHTML = `

                <div class="card mb-3" style="max-width: 940px;">
                    <a href="${task.id}.html" target="_blank">
                        <div class="row no-gutters">
                            <div class="col-md-4 card-img-more">
                                <img src="${task.foto}" class="card-img zoom_img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <p class="card-date"><small>${this.convertToDate(task.timestamp)}</small></p>
                                <h5 class="card-title">${task.titulo}</h5>
                                <p class="card-text">${task.texto}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            `;


        li.querySelector('a').addEventListener('click', e => {
            dataNews = task;
            localStorage.setItem("news", JSON.stringify(task)); // converte para string
        });

        document.querySelector('.container').append(li);

    });

}

function convertToDate(time){

    data = new Date(time * 1000);   // converte para milliseconds, somente -> new Date() <- pega a data do PC
    date = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    hours = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    return date + " - " + hours;
}

connectFirebase();  // credenciais para conectar ao firebase
readFiles();