<?php


namespace AppBundle\Service;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class MailerService extends AbstractController
{
    /**
     * @param \Swift_Mailer $mailer
     * @param $token
     * @param $username
     * @param $template
     * @param $to
     */
    public function sendToken(\Swift_Mailer $mailer, $token, $to, $username, $template)
    {
        $message = (new \Swift_Message('Mail de confirmation'))
            ->setFrom('noreplymipa@gmail.com')
            ->setTo($to)
            ->setBody(
                $this->renderView(
                    'ProduitsGMS/'.$template,
                    [
                        'token' => $token,
                        'username' => $username,
                        'confirmationUrl'=> $this->generateUrl('confirm_account',['token'=>$token, 'username'=>$username],  UrlGeneratorInterface::ABSOLUTE_URL)
                    ]
                ),
                'text/html'
            )
        ;
        $mailer->send($message);
    }

}