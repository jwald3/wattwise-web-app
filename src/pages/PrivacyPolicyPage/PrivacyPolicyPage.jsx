import React from "react";
import "./PrivacyPolicyPage.css";
import Layout from "../../Layouts/Layout";

const PrivacyPolicyPage = () => {
    const date = "10 October 2023";

    return (
        <Layout>
            <div className="main-page">
                <div className="privacy-policy-container">
                    <div>
                        <h1>Privacy Policy for Wattwise</h1>
                        <p>Last updated: {date}</p>

                        <h2>Information We Collect</h2>
                        <p>
                            The Wattwise app does not collect or store any
                            personal data.
                        </p>

                        <h2>How We Use Information</h2>
                        <p>
                            As the app does not collect any data, no data is
                            used or shared with third parties.
                        </p>

                        <h2>Data Protection</h2>
                        <p>
                            Your privacy is a priority at Wattwise, and we go to
                            great lengths to protect it. Given that our app does
                            not collect any data, there is no risk of your data
                            being exposed or misused.
                        </p>

                        <h2>Data Retention</h2>
                        <p>
                            As we do not collect or store any data, there is no
                            data retention policy necessary for our app.
                        </p>

                        <h2>Your Rights</h2>
                        <p>
                            You have the right to request deletion of any data.
                            However, as we do not collect or store any data,
                            there is no data to delete.
                        </p>

                        <h2>Consent</h2>
                        <p>
                            By using Wattwise, you hereby consent to our Privacy
                            Policy and agree to its terms.
                        </p>

                        <h2>Changes to our Privacy Policy</h2>
                        <p>
                            We reserve the right to update our Privacy Policy at
                            any time. Thus, we advise you to review this page
                            periodically for any changes. We will notify you of
                            any changes by posting the new Privacy Policy on
                            this page. These changes areeffective immediately
                            after they are posted on this page.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions or suggestions about our
                            Privacy Policy, do not hesitate to contact us{" "}
                            <a href="https://twitter.com/WattwiseApp">
                                on our official Twitter account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicyPage;
