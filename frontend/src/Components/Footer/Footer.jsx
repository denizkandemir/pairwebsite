import "./Footer.scss";
import { Link } from "react-router-dom";
import schoolLogo from "/schoolLogoWhite.png";
import pairLogo from "/pairLogo.png";

const Footer = () => {

    const contactInfo = [
        {
            id: 1,
            svg: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="white" />
                </svg>
            ),
            info: "pair.skn",
            link: "https://www.instagram.com/pair.skn/"
        },

        {
            id: 2,
            svg: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="white" />
                </svg>
            ),
            info: "sknpair",
            link: "https://www.linkedin.com/in/sknpair?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },

        {
            id: 3,
            svg: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.564H7.078V12.073H10.125V9.405C10.125 6.348 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.922 17.344 4.922V7.875H15.83C14.34 7.875 13.875 8.8 13.875 9.75V12.073H17.203L16.671 15.564H13.875V24C19.612 23.094 24 18.1 24 12.073Z" fill="white" />
                </svg>
            ),
            info: "pair",
            link: "https://www.facebook.com/share/17gu58MeTJ/"
        },

        {
            id: 4,
                svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -4 32 32" version="1.1" fill="#ffffff" stroke="#ffffff">

                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />

                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                    <g id="SVGRepo_iconCarrier"> <title>mail</title>  <defs> </defs> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="Icon-Set" transform="translate(-412.000000, -259.000000)" fill="#ffffff"> <path d="M442,279 C442,279.203 441.961,279.395 441.905,279.578 L433,270 L442,263 L442,279 L442,279 Z M415.556,280.946 L424.58,271.33 L428,273.915 L431.272,271.314 L440.444,280.946 C440.301,280.979 415.699,280.979 415.556,280.946 L415.556,280.946 Z M414,279 L414,263 L423,270 L414.095,279.578 C414.039,279.395 414,279.203 414,279 L414,279 Z M441,261 L428,271 L415,261 L441,261 L441,261 Z M440,259 L416,259 C413.791,259 412,260.791 412,263 L412,279 C412,281.209 413.791,283 416,283 L440,283 C442.209,283 444,281.209 444,279 L444,263 C444,260.791 442.209,259 440,259 L440,259 Z" id="mail"> </path> </g> </g> </g>
                </svg>
            ),
            info: "sknpair@uw.edu.pl",
            link: "mailto:info@pairinstitute.com",

        }
    ];


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