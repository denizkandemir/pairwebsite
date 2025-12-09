import ContactContent from "/src/Components/ContactContent/ContactContent.jsx";
import Banner from "../Components/Banner/Banner";
import contactBannerImg from "/contactBanner1.png";

const ContactPage = () => {


    const contactTexts = [
        {
            id: 1,
            text: "We would love to hear from you! Whether you’re interested in our work, have questions about our research, or want to explore potential collaborations, our team is here to help!"
        },

        {
            id: 2,
            text: "Feel free to reach out with your questions, feedback, partnership proposals, or even new project ideas you’d like to develop with us.",
        }
    ]

    return (
        <>
         <Banner title="Contact Us" backgroundImage={contactBannerImg} texts={contactTexts} />
         <div className="banner-transition"></div>
         <ContactContent/>
        </>
    )
}

export default ContactPage;