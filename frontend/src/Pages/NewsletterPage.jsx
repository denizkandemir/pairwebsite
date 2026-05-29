import Newsletter from "../Components/Newsletter/Newsletter";
import useSeoMeta from "../hooks/useSeoMeta";
import { pageSeo } from "../seo/siteSeo";

const NewsletterPage = () => {

    useSeoMeta(pageSeo.newsletter);


    return(
        <Newsletter />  
    )
}

export default NewsletterPage;