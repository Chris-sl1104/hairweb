const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Creates an assessment to analyze the risk of the interaction.
 *
 * @param {Object} params
 * @param {string} params.projectID - Your Google Cloud project ID.
 * @param {string} params.recaptchaKey - reCAPTCHA key associated with the site/application.
 * @param {string} params.token - The token generated from the client.
 * @param {string} params.recaptchaAction - The action associated with the token.
 * @returns {Promise<number|null>} The reCAPTCHA risk score or null if validation fails.
 */
async function createAssessment({
                                    projectID = "robotic-sky-434907-m2",
                                    recaptchaKey = "6LfsEToqAAAAAMC8N5ActNXZ5Q6mUhywhF83ys39",
                                    token = "action-token",
                                    recaptchaAction = "action-name",
                                }) {
    // Create reCAPTCHA client
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
    const request = {
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaKey,
            },
        },
        parent: projectPath,
    };

    try {
        // Call the reCAPTCHA Enterprise API to create an assessment
        const [response] = await client.createAssessment(request);

        // Check if the token is valid
        if (!response.tokenProperties.valid) {
            console.error(`The CreateAssessment call failed: ${response.tokenProperties.invalidReason}`);
            return null;
        }

        // Check if the expected action matches the action in the response
        if (response.tokenProperties.action !== recaptchaAction) {
            console.error(`The expected action (${recaptchaAction}) does not match the token action (${response.tokenProperties.action})`);
            return null;
        }

        // Retrieve and log the risk score and reasons
        const riskScore = response.riskAnalysis.score;
        console.log(`The reCAPTCHA score is: ${riskScore}`);

        if (response.riskAnalysis.reasons) {
            response.riskAnalysis.reasons.forEach((reason) => {
                console.log(`Reason: ${reason}`);
            });
        }

        return riskScore;

    } catch (error) {
        console.error('Error creating assessment:', error);
        return null;
    } finally {
        // Clean up the client if necessary
        client.close();
    }
}
