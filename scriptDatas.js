//PLAY E PAUSE DO DISCO
const audio = document.getElementById("musicaDisco");
const disco = document.getElementById("img_disco");

if (audio && disco) {
    audio.addEventListener("play", () => {
        disco.classList.add("tocando");
    });

    audio.addEventListener("pause", () => {
        disco.classList.remove("tocando");
    });
}