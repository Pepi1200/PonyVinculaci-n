import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getNotice } from "../../Services/fetchService";
import toBase64 from "../pure/blobToBase64";
import { Navigation, Pagination, Scrollbar, A11y,  Autoplay } from 'swiper/modules'
import DefaultImage from "../../images/icons/errorNoticias.png";

export default function Notices() {
    const notices = getNotice();
    if(notices != null){
        return (
            <div>
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={2}
                slidesPerView={1}
                navigation = {true}
                pagination={true}
                loop
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                style={{height: "calc(400 / 90 * 100%)" , width: "90%",boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.2)",borderRadius: "15px"}}
                >
                    {notices.map((notice) => (
                        <SwiperSlide key={notice.id_noticia}>
                        <a href={notice.link}>
                            <img
                                src={`data:image/jpeg;base64, ${toBase64(notice.image)}`}
                                alt={notice.id_noticia}
                                style={{height: "calc(400 / 90 * 100%)" , width: "100%", borderRadius: "15px"}}
                            />
                        </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
          );
    }else{
        return(
        <div style={{height: "calc(400 / 90 * 100%)" , width: "90%", marginLeft: "5%", borderRadius: "15px"}}>
            <img src={DefaultImage} alt="notNotice" style={{height: "calc(400 / 90 * 100%)" , width: "100%"}} />        
        </div> 
        );  
    }
}
