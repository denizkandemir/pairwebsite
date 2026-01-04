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
                    <div className="contact-cards-container">
                        {
                            contactInfo.map((info) => (
                                <div key={info.id} className="contact-card-wrapper">
                                    <div className="contact-card">
                                        <Link className="contact-card-link" to={info.link}>
                                            <div className="contact-card-link">
                                                <img src={info.img} alt="" className="contact-card-img" />
                                                <h4 className="contact-card-title main-title">  {info.title} Address  </h4>
                                                <h4 className="contact-card-title"> {info.info} </h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="contact-subscribe-container">
                        <Subscribe title={"Get in Touch"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactContent;