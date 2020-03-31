<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('base.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     *@Route("/test")
     */
    public function testAction(){
        return $this->render('TwigBundle:Exception:error404.html.twig');
    }

    public function aproposAction(Request $request){

        $user = $request->getSession()->get('user');
        return $this->render('default/aPropos.html.twig',array('user'=>$user));
    }

    /**
     * @Route("/aproposchr", name="aproposchr")
     */
    public function aproposchrAction(Request $request){

        $user = $request->getSession()->get('user');
        return $this->render('default/aProposchr.html.twig',array('user'=>$user));
    }

    /**
     * @Route("/contactchr", name="contactchr")
     */
    public function contactchrAction(Request $request, \Swift_Mailer $mailer){

        $user = $request->getSession()->get('user');
        if (isset($_POST['valider'])){
            $message = (new \Swift_Message('Service client'))
                ->setFrom($request->get('email'))
                ->setTo('noreplymipa@gmail.com')
                ->setBody(
                    'Nom: '.$request->get('lastname').' Prénom: '.$request->get('firstname')
                    ."\n".' Tél: '.$request->get('phone').' Société: '.$request->get('company')
                    ."\n".' Message: '.$request->get('message')
                )
            ;

            $mailer->send($message);
            $this->get('session')->getFlashBag()->add('Notice','Votre message a été envoyé à l\'équipe MIPA et sera traité dans les plus brefs délais. Merci!');
        }
        return $this->render('default/contactchr.html.twig',array('user'=>$user));
    }

    /**
     * @Route("/aproposbase", name="aproposbase")
     */
    public function aproposbaseAction(Request $request){

        return $this->render('default/aProposbase.html.twig',array());
    }

    /**
     * @Route("/contactbase", name="contactbase")
     */
    public function contactbaseAction(Request $request, \Swift_Mailer $mailer){

        if (isset($_POST['valider'])){
            $message = (new \Swift_Message('Service client'))
                ->setFrom($request->get('email'))
                ->setTo('noreplymipa@gmail.com')
                ->setBody(
                    'Nom: '.$request->get('lastname').' Prénom: '.$request->get('firstname')
                    ."\n".' Tél: '.$request->get('phone').' Société: '.$request->get('company')
                    ."\n".' Message: '.$request->get('message')
                )
            ;

            $mailer->send($message);
            $this->get('session')->getFlashBag()->add('Notice','Votre message a été envoyé à l\'équipe MIPA et sera traité dans les plus brefs délais. Merci!');
        }
        return $this->render('default/contactbase.html.twig',array());
    }

    public function contactAction(Request $request, \Swift_Mailer $mailer){

        $user = $request->getSession()->get('user');
        if (isset($_POST['valider'])){
        $message = (new \Swift_Message('Service client'))
            ->setFrom($request->get('email'))
            ->setTo('noreplymipa@gmail.com')
            ->setBody(
               'Nom: '.$request->get('lastname').' Prénom: '.$request->get('firstname')
                ."\n".' Tél: '.$request->get('phone').' Société: '.$request->get('company')
                ."\n".' Message: '.$request->get('message')
            )
        ;

        $mailer->send($message);
        $this->get('session')->getFlashBag()->add('Notice','Votre message a été envoyé à l\'équipe MIPA et sera traité dans les plus brefs délais. Merci!');
        }
        return $this->render('default/contact.html.twig',array('user'=>$user));
    }




}
