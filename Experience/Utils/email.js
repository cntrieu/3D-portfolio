import emailjs from '@emailjs/browser';

export default function() {
    return {
      methods: {
        sendEmail(formElement) {
          emailjs.sendForm('service_rq1jv2f', 'template_51ty9kb', formElement, 'MvradWnmhQoURIilQ')
            .then((result) => {
              console.log('SUCCESS!', result.text);

              const thankYou = document.querySelector('.thank-you-message');
              thankYou.classList.remove('hidden');

              setTimeout(() => {
                thankYou.classList.add('hidden');
              }, 3000)
            })
            .catch((error) => {
              console.log('FAILED...', error.text);
            });
        }
      },
    };
  }