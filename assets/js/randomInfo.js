// script para pegar 3 artigos randomicos
class randomInfo {

    constructor(){

        this._randInf = [];

        connectFirebase();
        this.readInfos();

    }

    readInfos(){

        let weapons = firebase.database().ref('randomInfos');   // pega o array das noticias em destaque

        weapons.on('value', snapshot => {
            
            snapshot.forEach(info =>{

                this._randInf.push(info.val());
                
            });

            this.shuffle(this._randInf);
            
            // mostra as noticias na pagina
            this.renderInfo();

        });

    }

    renderInfo(){

        this._randInf.forEach(task => {

            let li = document.createElement('div');
    
            li.innerHTML = `

                <a href="https://huntshowup.com/${task.id}" target="_blank" >
                <div class="card margin-card bg-dark ">
                    <div class="card-img-more">
                        <img src="${task.foto}" class="card-img-top small_img" alt="..." style="width: 100%;">
                        </div>
                    <div class="card-body card-body-more-info">
                    <h6 class="card-title with-padding">${task.titulo}</h6>
                    <p class="card-text with-padding"><small class="text-muted">${task.texto}</small></p>
                    </div>
                </div>
                </a>

            `;

            document.querySelector('.moreinfo').appendChild(li);

        });

    }

    
    // embaralha as posições dos streamers
    shuffle(array) {
        var m = array.length, t, i;
    
        // While there remain elements to shuffle…
        while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        }
    
        return array;
    }

}

randInfo = new randomInfo();