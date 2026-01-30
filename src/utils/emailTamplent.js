
export const verifyAccountTemplate = (receiverEmail, serviceDescription,title) => {
    return {
        to: receiverEmail,
        subject: `COMMUNITY SERVICES ${title}`,
        from: `COMMUNITY SERVICES <${process.env.SMTP_GMAIL_SENDER_EMAIL}>`,
        text: 'Hello From COMMUNITY SERVICES, We received a request to verify your account.',
        html: `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #E8F4FD 0%, #D6E9F7 100%); min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table style="max-width: 700px; width: 100%; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <tr>
                        <td style="background: #408BF6; padding: 10px 00px; text-align: center;">
                            <div style="display: inline-flex; align-items: center; gap: 8px;">
                                <div style="width: 65px; height: 60px; margin-right: 20px; border-radius: 4px; position: relative;">
                                    <img src="https://res.cloudinary.com/donuwgeyj/image/upload/v1762802521/lv_petroleum_logo_aux4at.png" alt="COMMUNITY SERVICES Logo" style="width: 65px; height: 60px;" />
                                </div>
                                <span style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 600;">COMMUNITY SERVICES</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 40px;">
                            <h2 style="color: #408BF6; margin: 0 0 20px 0; font-size: 28px; font-weight: 600; text-align: center;">Verify Account Email Address</h2>

                            <p style="color: #5A6C7D; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; text-align: center;">
                                Welcome to COMMUNITY SERVICES! We're excited to have you join our services. To complete your registration and access all features, please verify your email address.
                            </p>

                            <div style="text-align: center; margin: 10px 0;">
                                <p style="display: inline-block; background: #408BF6; color: #FFFFFF; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px #9DC2EF; transition: all 0.3s ease;"> Verification OTP </p>
                            </div>

                            <div style="background-color: #F8FAFC; border-radius: 8px; padding: 10px; margin: 10px 0;">
                                <p style="color: #5A6C7D; font-weight: 900; font-size: 50px; margin: 0 0 10px 0; text-align: center;"> ${serviceDescription,title} </p>
                            </div>
                            <div style="border-left: 4px solid #4A90E2; padding-left: 16px; margin: 30px 0;">
                                <p style="color: #5A6C7D; font-size: 14px; margin: 0; line-height: 1.5;">
                                    <strong>Security Note:</strong> This verification OTP will expire in 24 hours for your security. If you didn't create an account with COMMUNITY SERVICES, please ignore this email.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #F8FAFC; padding: 10px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
                            <p style="color: #94A3B8; font-size: 14px; margin: 0 0 10px 0;"> Need help? Contact our support team at <a href="mailto:support@lvpetroleum.com" style="color: #4A90E2; text-decoration: none;">support@lvpetroleum.com</a> </p>
                            <p style="color: #CBD5E1; font-size: 12px; margin: 0;"> © 2024 COMMUNITY SERVICES. All rights reserved. </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`,
    };
};