const txtID = document.getElementById('txtID');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const txtDenuncia = document.getElementById('txtDenuncia');
const txtData = document.getElementById('txtData');
const txtVeiculo = document.getElementById('txtVeiculo');
const txtPlaca = document.getElementById('txtPlaca');
const txtMarca = document.getElementById('txtMarca');
const txtLocal = document.getElementById('txtLocal');
const txtObservacao = document.getElementById('txtObservacao');
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const video3 = document.getElementById('video3');
var id;
var pass;

$(document).keypress(function(e){
    if(e.which == 13) $('#btnLogin').click();
});

btnLogin.addEventListener('click', e => {
    id = txtID.value;
    pass = txtPassword.value;
    const promisse = getDenuncia();
    promisse.catch(e => console.log(e.message));
});

(function() {

    const config = {
    apiKey: "AIzaSyA-1crMeN9VFLeRKLtchSdd_c-gkg1jE0U",
    authDomain: "registrodeinfracoes.firebaseapp.com",
    databaseURL: "https://registrodeinfracoes.firebaseio.com",
    projectId: "registrodeinfracoes",
    storageBucket: "registrodeinfracoes.appspot.com",
    messagingSenderId: "615845445605",
    appId: "1:615845445605:web:f01c481c856919aad6f90c"
    };
    firebase.initializeApp(config);    
    
}());

function getHttpRequest() {
    if (window.XMLHttpRequest) {
        // Outros browsers
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return req;
}

    function getDenuncia(){
    var req = getHttpRequest();
    var url = "https://registrodeinfracoes.firebaseio.com/modulousuario/denuncias.json";
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var retorno = JSON.parse(req.responseText);
                for(var k in retorno){
                    if(retorno[k].protocolo == id && retorno[k].senha == pass){
                        txtData.value = retorno[k].data;
                        txtDenuncia.value = retorno[k].indInfracao;
                        txtVeiculo.value = retorno[k].especieVeiculo;
                        txtMarca.value = retorno[k].marcaVeiculo;
                        txtPlaca.value = retorno[k].placaVeiculo;
                        txtLocal.value = retorno[k].indLocal;
                        txtObservacao.value = retorno[k].observacao;
                        protocolo = id;
                        senha = pass;
                        var provas = retorno[k].provas;
                        
                        var videos = [];
                        var x = 0;
                        for (var k in provas) {
                            videos[x] = provas[k];
                            var pos = videos[x].lastIndexOf('=');
                            var token = videos[x].substring(pos+1,videos[x].lenght);
                            if(k == token){
                                x++;
                            }
                            else{
                                alert('Video Adulterado! Favor entrar em contato com o SIRINT.');
                            }
                        }

                        if(videos[1] == null){
                            $(video2).hide();
                        }
                        if(videos[2] == null){
                            $(video3).hide();
                        }
    
                        $("#video").attr('src', videos[0]);
    
    
                        video1.addEventListener('click', e => {
                            $("#video").attr('src', videos[0]);
                        });
                        video2.addEventListener('click', e => {
                            $("#video").attr('src', videos[1]);
                        });
                        video3.addEventListener('click', e => {
                            $("#video").attr('src', videos[2]);
                        });    
                    }
                }
                if(protocolo == id && senha == pass){
                    $('#modal_aberto').modal({
                        show: true
                    });
                }

                else{
                    alert('Não existe infração para os dados informados.')
                }
            }
        }
    }
    req.open("GET", url, true);
    req.send(null);
    }