import "./Footer.scss";
import { Link } from "react-router-dom";
import schoolLogo from "/schoolLogoWhite.png";
import pairLogo from "/pairLogo.png";
import { contactInfo } from "../../objects/ContactInfo";

const Footer = () => {

    return (
        <>
            <div className="footer-container">
                <div className="footer-content-container">

                    <div className="footer-logo-container">
                        <img src={schoolLogo} alt="School Logo" className="footer-logo-img school-logo" />
                        <img src={pairLogo} alt="Pair Logo" className="footer-logo-img pair-logo" />
                    </div>

                    <div className="footer-menu-container  footer-contact-svg-container">
                        <h3 className="footer-title"> Contact </h3>
                        {
                            contactInfo.map((info) => (
                                <div key={info.id} className="footer-contact-container">
                                    {info.svg}
                                    <Link target="blank" className="footer-link" to={info.link}>
                                        <p className="footer-p footer-contact-p"> {info.info} </p>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="footer-menu-container">
                        <h3 className="footer-title"> Menu </h3>
                        <Link className="footer-link" to="/"> <p className="footer-p "> Homepage </p> </Link>
                        <Link className="footer-link" to="/aboutus"> <p className="footer-p"> About Us  </p></Link>
                        <Link className="footer-link" to="/events"> <p className="footer-p"> Events  </p></Link>
                        <Link className="footer-link" to="/blog"> <p className="footer-p"> Blog  </p></Link>
                        <Link className="footer-link" to="/contact"> <p className="footer-p"> Contact  </p></Link>
                    </div>

                    <div className="footer-menu-container">
                        <h3 className="footer-title"> Our University </h3>
                        <a className="footer-link" target="blank" href="https://en.uw.edu.pl"> <p className="footer-p"> University Of Warsaw </p> </a>
                        <a className="footer-link" target="blank" href="https://psych.uw.edu.pl"> <p className="footer-p"> Faculty Of Psychology </p></a>
                        <a className="footer-link" target="blank" href="https://wisp.uw.edu.pl"> <p className="footer-p"> Warsaw International Students in Psychology </p></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;