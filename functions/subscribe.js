export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const { email } = await request.json();

      if (!email) {
        return new Response('Email is required', { status: 400 });
      }

      // This is a placeholder for sending the email. In a real application,
      // you would use a transactional email service like SendGrid, Mailgun, or AWS SES.
      // For this example, we'll just log it to the console.
      console.log(`New subscriber: ${email}`);
      
      // In a real application, you would add logic here to send an email notification
      // to appreciateit821@gmail.com. Since we can't send emails directly from here,
      // we'll simulate a success response.

      return new Response(JSON.stringify({ success: true, message: 'Thank you for subscribing!' }), {
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Subscription error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};