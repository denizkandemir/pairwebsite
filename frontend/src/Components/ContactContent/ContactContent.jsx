import "./ContactContent.scss";
import useFadeInOnScroll from "../../hooks/FadeInAnimation/FadeInAnimation";
import { contactInfo } from "../../objects/ContactInfo";
import { Link } from "react-router-dom";
import Subscribe from "../Subscribe/Subscribe";

const ContactContent = () => {

    useFadeInOnScroll();

    return (
        <>
            <div className="contact-container">
                <div className="contact-content-container">
                    <div className="contact-title-container">
                        <h3 className="contact-title"> Contact Us! </h3>
                    </div>
                    <div className="contact-cards-container">
                        {
                            contactInfo.slice().reverse().map((info) => (
                                <div key={info.id} className="contact-card-wrapper">
                                    <div className="contact-card">
                                        <Link to={info.link}>
                                            {info.svg}
                                            <h4 className="contact-card-title"> {info.method} </h4>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Subscribe title={"Get in Touch"} />
                </div>
            </div>
        </>
    )
}

export default ContactContent;