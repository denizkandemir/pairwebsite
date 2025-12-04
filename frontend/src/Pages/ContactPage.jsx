import ContactContent from "/src/Components/ContactContent/ContactContent.jsx";
import Banner from "../Components/Banner/Banner";

const ContactPage = () => {
    return (
        <>
         <Banner title="Contact Us" text="We would love to hear from you! Reach out to us with any questions, feedback, or collaboration ideas." />
         <ContactContent/>
        </>
    )
}

export default ContactPage;