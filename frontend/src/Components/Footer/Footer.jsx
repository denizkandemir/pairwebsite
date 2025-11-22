import "./Footer.scss";
import { Link } from "react-router-dom";
import schoolLogo from "/schoolLogoWhite.png";  
import pairLogo from "/pairLogo.png";

const Footer = () => {


    return (
        <>
            <div className="footer-container">
                <div className="footer-content-container">

                   <div className="footer-logo-container">
                        <img src={pairLogo} alt="Pair Logo" className="footer-logo-img" />
                       <img src={schoolLogo} alt="School Logo" className="footer-logo-img" />
                   </div>

                    <div className="footer-contact-svg-container">
                        <h3 className="footer-title"> Contact </h3>
                        {
                            // contactCards.map((info) => (
                            //     <div key={info.id} className="footer-wrapper">
                            //         {info.svg}
                            //         <Link className="footer-link" to={info.link}>
                            //             <p className="footer-p"> {info.info} </p>
                            //         </Link>
                            //     </div>
                            // ))
                        }
                    </div>
                    <div className="footer-menu-container">
                        <h3 className="footer-title"> Menü </h3>
                        <Link className="footer-link" to="/"> <p className="footer-p"> Homepage </p> </Link>
                        <Link className="footer-link" to="/aboutus"> <p className="footer-p"> About Us  </p></Link>
                        <Link className="footer-link" to="/events"> <p className="footer-p"> Events  </p></Link>
                        <Link className="footer-link" to="/blog"> <p className="footer-p"> Blog  </p></Link>
                        <Link className="footer-link" to="/contact"> <p className="footer-p"> Contact  </p></Link>
                    </div>
                    <div className="footer-menu-container footer-middle">
                        <h3 className="footer-title"> Bağlantılar </h3>
                        <a className="footer-link" target="blank" href="https://www.meb.gov.tr"> <p className="footer-p"> Milli Eğitim Bakanlığı </p> </a>
                        <a className="footer-link" target="blank" href="https://fclturkiye.eba.gov.tr"> <p className="footer-p"> FCL Türkiye  </p></a>
                        <a className="footer-link" target="blank" href="https://www-eun-org.translate.goog/professional-development/future-classroom-lab?_x_tr_sch=http&_x_tr_sl=en&_x_tr_tl=tr&_x_tr_hl=tr&_x_tr_pto=tc"><p className="footer-p"> European Schoolnet </p></a>
                    </div>

                    <div className="footer-menu-container">
                        <h3 className="footer-title"> Okulumuzun Projeleri </h3>
                        <a className="footer-link" target="blank" href="https://sehituzmancavusaliakdogan2g.weebly.com/#"> <p className="footer-p"> Kodluyoruz   </p> </a>
                        <a className="footer-link" target="blank" href="https://sehituzmancavusaliakdoganilkokul.meb.k12.tr/meb_iys_dosyalar/35/29/970299/icerikler/listele_okullar-hayat-olsun.html?CHK=ed2ce0d02fd2d046bda134503c60b858r"> <p className="footer-p"> Okullar Hayat Olsun  </p></a>
                        <a className="footer-link" target="blank" href="https://sehituzmancavusaliakdoganilkokul.meb.k12.tr/icerikler/tabletten-sanat-atolyelerine_6048839.html"><p className="footer-p"> EkoSchool </p></a>
                        <a className="footer-link" target="blank" href="https://sehituzmancavusaliakdoganilkokul.meb.k12.tr/meb_iys_dosyalar/35/29/970299/dosyalar/2018_12/06110102_ekookullar.pdf?CHK=ed2ce0d02fd2d046bda134503c60b858"> <p className="footer-p"> Sorunlarımızdan Sorumluyuz Projesi  </p></a>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Footer;