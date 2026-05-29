import ContactContent from "/src/Components/ContactContent/ContactContent.jsx";
import Banner from "../Components/Banner/Banner";
import contactBannerImg from "/contactBanner1.png";
import useSeoMeta from "../hooks/useSeoMeta";
import { pageSeo } from "../seo/siteSeo";

const ContactPage = () => {
    const contactDescription = "Whether you are interested in our work, have questions about ongoing studies, or want to explore collaboration, the PAIR team is here to connect.";
    const contactSecondaryDescription = "Reach out with research questions, partnership ideas, and opportunities to build interdisciplinary projects together.";

    useSeoMeta({
        ...pageSeo.contact,
        description: `${contactDescription} ${contactSecondaryDescription}`,
        image: contactBannerImg,
        keywords: [...pageSeo.contact.keywords, 'faculty collaboration', 'research communication'],
    });

    return (
        <>
         <Banner
            badgeText="Connect With PAIR"
            title="Contact Our Research Community"
            titleHighlight="Research Community"
            imageSrc={contactBannerImg}
            imageAlt="Contact PAIR team"
            description={contactDescription}
            secondaryDescription={contactSecondaryDescription}
            chips={["Collaboration", "Partnerships", "Research Support"]}
            floatingLabels={["Open Dialogue", "Interdisciplinary Team"]}
            detailVariant="contact"
            imgClass={"banner-img-float"}
         />
         <div className="banner-transition"></div>
         <ContactContent/>
        </>
    )
}

export default ContactPage;