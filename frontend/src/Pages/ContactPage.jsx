import ContactContent from "/src/Components/ContactContent/ContactContent.jsx";
import Banner from "../Components/Banner/Banner";
import bannerBackground from "/bannerBackground2.png";

const ContactPage = () => {
    return (
        <>
         <Banner title="Contact Us" backgroundImage={bannerBackground} text="We would love to hear from you! Reach out to us with any questions, feedback, or collaboration ideas."  />
         <div className="banner-transition"></div>
         <ContactContent/>
        </>
    )
}

export default ContactPage;