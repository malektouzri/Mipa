<?php


namespace AppBundle\Controller;


use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends Controller
{

    public function loginloAction(Request $request)
    {
        // Si le visiteur est déjà identifié, on le redirige vers l'accueil
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:User")->findBy(array('username'=>$request->get('_username')));
        if($user != null){
            if($user->getEnabled() == false){

            }
            elseif ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_REMEMBERED') ) {
                return $this->redirectToRoute('afficheall_gms');
            }

        }

        $authenticationUtils = $this->get('security.authentication_utils');

        return $this->render('ProduitsGMS/login.html.twig', array(
            'last_username' => $authenticationUtils->getLastUsername(),
            'error'         => $authenticationUtils->getLastAuthenticationError(),
        ));
    }

}