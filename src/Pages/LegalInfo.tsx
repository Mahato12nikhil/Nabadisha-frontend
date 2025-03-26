import React from "react";

const LegalInfo: React.FC = () => {
  return (
    <div className="home px-6 py-10 max-w-4xl mx-auto text-text">
      <h1 className="heading text-center mb-6">Legal Information</h1>

      {/* Terms & Conditions */}
      <section className="mb-8">
        <h2 className="subheading">Terms & Conditions</h2>
        <p className="paragraph mt-2">
          Welcome to Baidyanathpur Nabadisha Sangha. By accessing our website, 
          you agree to comply with our terms and conditions. We reserve the right 
          to modify these terms at any time. Continued use of our services 
          constitutes acceptance of the updated terms.
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-8">
        <h2 className="subheading">Privacy Policy</h2>
        <p className="paragraph mt-2">
          We value your privacy. Any personal information collected is used solely 
          for communication and community activities. We do not share user data 
          with third parties. Your use of our website indicates acceptance of this policy.
        </p>
      </section>

      {/* Our Journey, Vision, Mission, and Commitment */}
      <section className="mb-8">
        <h2 className="subheading">Our Journey</h2>
        <p className="paragraph mt-2">
          Baidyanathpur Nabadisha Sangha is a dedicated community club that has been 
          actively working towards social and cultural development since 2012. Even before 
          our official establishment, we had been hosting various events, with Saraswati Puja 
          being one of our earliest and most cherished traditions. Over the years, we have 
          grown not only in numbers but also in vision and impact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="subheading">Our Vision</h2>
        <p className="paragraph mt-2">
          Currently, with a team of more than 15 committed members, we strive to make meaningful 
          contributions to society. While we started with small-scale events, our aspirations 
          have expanded to encompass a broader spectrum of social responsibilities. Our mission 
          is to serve the community through education, social reforms, environmental initiatives, 
          and support for the underprivileged.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="subheading">Our Mission</h2>
        <p className="paragraph mt-2">
          With a deep-rooted commitment to bringing positive change, we aim to create a platform 
          that fosters collective growth, nurtures awareness, and builds a better future for all. 
          Through our initiatives, we seek to bridge gaps, uplift the needy, and promote sustainable 
          development.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="subheading">Our Commitment</h2>
        <p className="paragraph mt-2">
          As we move forward, we remain dedicated to strengthening our efforts, reaching more people, 
          and making a lasting difference in the world around us.
        </p>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="subheading">Contact Us</h2>
        <p className="paragraph mt-2">
          For any inquiries, feel free to reach out to us at:
        </p>
        <p className="paragraph font-medium mt-2">
          📧 Email: 
          <a href="mailto:bnpnabadishasangha@gmail.com" className="text-primary hover:underline">
            bnpnabadishasangha@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default LegalInfo;
