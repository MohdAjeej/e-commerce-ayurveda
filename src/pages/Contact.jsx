import ContactSection from "../components/sections/ContactSection";
import SocialSection from "../components/sections/SocialSection";
import PageIntro from "../components/common/PageIntro";

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Contact Us"
        title="Let's talk wellness"
        text="Questions about our products, distribution, or partnerships? We're here to help."
      />
      <ContactSection />
      <SocialSection />
    </>
  );
}
