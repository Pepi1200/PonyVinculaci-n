import Imagenes from "../models/example-json/imagenes.json"
import Noticias from "../models/example-json/noticias.json"
import Videos from "../models/example-json/videos.json";
import Avatar from "../models/example-json/userImage.json";
import vacantes from "../models/example-json/vacantes.json";
import Carreras from "../models/example-json/carreras.json"

export function getImages(page){
    return Imagenes.data.filter((item) => item.page === page);
}

export function getNotice(page){
    return Noticias.data;
}

export function getVideos(){
    return Videos.files;
}

export function getAvatar(){
    return Avatar.avatar;
}

export function getVacantes(){
    return vacantes.data;
}

export function getCarreras(){
    return Carreras.data;
}