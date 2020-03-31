<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Produit_GMS;
use AppBundle\Entity\User;
use AppBundle\Form\FichierType;
use AppBundle\Form\Produit_GMSType;
use AppBundle\Form\ProfileUserType;
use AppBundle\Form\UserType;
use AppBundle\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class GMSController extends Controller
{


    /**
     * @Route("/search", name="search")
     */
    public function searchAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:Produit_GMS')->byLibelle($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getLibelle());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('ProduitsGMS/recherche.html.twig',array());
    }

    /**
     * @Route("/recherche", name="recherche")
     */
    public function rechercheAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $promos = $em->getRepository("AppBundle:Promotion")->byGMS();

        $user = $request->getSession()->get('user');
        $gms = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $gms = $em->getRepository("AppBundle:Produit_GMS")->byLibelle($request->get('ref'));
                if($gms != null){
                    return $this->render('ProduitsGMS/recherche.html.twig',array('pdts'=>$gms, 'user'=>$user, 'promo'=>$promos));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('ProduitsGMS/recherche.html.twig',array('pdts'=>$gms, 'user'=>$user, 'promo'=>$promos));
    }

    /**
     * @Route("/modif_mdp_gms", name="modif_mdp_gms")
     */
    public function modifPasswordAction(Request $request){
        $this->get('session')->getFlashBag()->clear();
        if(isset($_POST['valider'])){
            if($request->get('password') != $request->get('re_password')){
                $this->addFlash('Erreur', 'Les mots de passe ne sont pas identiques!');
            }else{
                $em = $this->getDoctrine()->getManager();
                $user = $em->getRepository("AppBundle:User")->find($request->getSession()->get('user')->getId());
                $user->setPassword($request->get('password'));
                $this->addFlash('Notice', 'Modification effectuée avec succés!');
              return  $this->redirectToRoute('profile_gms');
            }
        }
        return $this->render('ProduitsGMS/modif_password.html.twig', array());
    }

    /**
     * @Route("/profile_gms", name="profile_gms")
     *
     */
    public function modifProfileAction(Request $request){

        $this->get('session')->getFlashBag()->clear();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:User")->find($request->getSession()->get('user')->getId());

        $ancienUsername = $user->getUsername();
        $ancienEmail = $user->getEmail();
        $regex = '#^0[6-7]{1}\d{8}$#';
        if(isset($_POST['valider'])){
            $usernames = $em->getRepository('AppBundle:User')->findOneBy(array('username'=>$request->get('username')));
            $emails =  $em->getRepository('AppBundle:User')->findOneBy(array('email'=>$request->get('email')));
            if( $usernames != null && ($request->get('username') != $ancienUsername)){
                $this->addFlash('Erreur', 'Nom d\'utilisateur déja utilisé!');
            }elseif ($emails != null && ($request->get('email') != $ancienEmail)){
                $this->addFlash('Erreur', 'Adresse mail déja utilisée!');
            } elseif(!preg_match($regex, $request->get('telephone'))){
                $this->addFlash('Erreur', 'Numéro de téléphone invalide!');
            }
            else{
                $user->setAdresse($request->get('adresse'));
                $user->setEmail($request->get('email'));
                $user->setNom($request->get('nom'));
                $user->setPrenom($request->get('prenom'));
                $user->setTelephone($request->get('telephone'));
                $user->setUsername($request->get('username'));
                $em->persist($user);
                $em->flush();
                $this->addFlash('Notice', 'Modification effectuée avec succés!');
            }

        }
        return $this->render('ProduitsGMS/profile.html.twig', array('user'=>$user));
    }

    /**
     * @Route("/forgotten_password_gms", name="forgotten_password_gms")
     */
    public function forgottenPassword(Request $request, \Swift_Mailer $mailer, TokenGeneratorInterface $tokenGenerator)
    {
        if ($request->isMethod('POST')) {

            $email = $request->request->get('email');

            $entityManager = $this->getDoctrine()->getManager();
            $user = $entityManager->getRepository(User::class)->findOneBy(array('email'=>$email));

            if ($user === null) {
                $this->addFlash('Erreur', 'Cet email n\'est pas valide');
                return $this->render('ProduitsGMS/forgotten_password.html.twig');
            }
            $token = $tokenGenerator->generateToken();

            try{
                $user->setConfirmationToken($token);
                $entityManager->flush();
            } catch (\Exception $e) {
                $this->addFlash('Notice', $e->getMessage());
                return $this->render('ProduitsGMS/forgotten_password.html.twig');
            }

            $url = $this->generateUrl('reset_password_gms', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

            $message = (new \Swift_Message('Mot de passe oublié - Réinisialisation'))
                ->setFrom(array('noreplymipa@gmail.com'))
                ->setTo($user->getEmail())
                ->setBody(
                    "Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe:  " . $url,
                    'text/html'
                );
            $mailer->send($message);

            $this->addFlash('Notice', 'Mail envoyé!');

            return $this->redirectToRoute('login');
        }

        return $this->render('ProduitsGMS/forgotten_password.html.twig');
    }

    /**
     * @Route("/reset_password_gms/{token}", name="reset_password_gms")
     */
    public function resetPassword(Request $request, string $token)
    {
        $this->get('session')->getFlashBag()->clear();

        if ($request->isMethod('POST')) {
            $em = $this->getDoctrine()->getManager();

            $user = $em->getRepository(User::class)->findOneBy(array('confirmationToken'=>$token));

            if ($user === null) {
                $this->addFlash('Erreur', 'Impossible de mettre à jour le mot de passe');
                return $this->render('ProduitsGMS/reset_password.html.twig', ['token' => $token]);
            }

            $user->setConfirmationToken(null);
            $user->setPassword($request->get('password'));
            $em->flush();

            $session = $request->getSession();
            $session->set('user',$user);
            $session->start();

            $this->addFlash('Notice', 'Mot de passe mis à jour');

            return $this->redirectToRoute('afficheall_gms');
        }else {

            return $this->render('ProduitsGMS/reset_password.html.twig', ['token' => $token]);
        }

    }

    /**
     * @Route("/login", name="login")
     */
    public function loginAction(Request $request){
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:User")->findOneBy(array('username'=>$request->get('username')));
        if($user != null){
            if(!empty($user->getConfirmationToken())){
                $this->get('session')->getFlashBag()->add('Notice','Veuillez consulter vos emails pour réinitialiser votre mot de passe.');

            }else{
                $session = $request->getSession();
                $session->set('user',$user);
                $session->start();
                return $this->redirectToRoute('afficheall_gms');
            }


        }
        return $this->render('ProduitsGMS/login.html.twig', array(

        ));
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logoutAction(Request $request){
        $session = $request->getSession();
        $session->remove('user');
        unset($session);

        return $this->redirectToRoute('home_page');
    }


    /**
     * @return string
     * @throws \Exception
     */
    private function generateToken()
    {
        return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
    }


    /**
     * @Route("/register", name="register")
     */
    public function registerAction(Request $request, MailerService $mailerService, \Swift_Mailer $mailer){
        $this->get('session')->getFlashBag()->clear();

        $form = $this->createForm(UserType::class);
        $form->handleRequest($request);
        $regex = '#^0[6-7]{1}\d{8}$#';

        if($form->isValid() && $form->isSubmitted()){
            $em = $this->getDoctrine()->getManager();
            $usernames = $em->getRepository('AppBundle:User')->findOneBy(array('username'=>$request->get('username')));
            $emails =  $em->getRepository('AppBundle:User')->findOneBy(array('email'=>$request->get('email')));
            if( $usernames != null ){
                $this->addFlash('Erreur', 'Nom d\'utilisateur déja utilisé!');
            }elseif ($emails != null){
                $this->addFlash('Erreur', 'Adresse mail déja utilisée!');
            }
            elseif(!preg_match($regex, $form['telephone']->getData())){
                $this->get('session')->getFlashBag()->add('Erreur','Numéro de téléphone invalide!');
            }  else{

                $user = new User();
                $user->setAdresse($form['adresse']->getData());
                $user->setEmail($form['email']->getData());
                $user->setNom($form['nom']->getData());
                $user->setPrenom($form['prenom']->getData());
                $user->setPassword($form['password']->getData());
                $user->setUsername($form['username']->getData());
                $user->setTelephone($form['telephone']->getData());
                $user->setRoles(array('ROLE_GMS'));
                $user->setSalt('');
                $user->setEnabled(false);
                $user->setConfirmationToken($this->generateToken());
                $em->persist($user);
                $em->flush();

                $token = $user->getConfirmationToken();
                $email = $user->getEmail();
                $username = $user->getUsername();
                $mailerService->sendToken($mailer, $token, $email, $username, 'registration.email.twig');

                $this->get('session')->getFlashBag()->add('Notice','Votre inscription a été validée, vous aller recevoir un email de confirmation pour activer votre compte et pouvoir vous connecter');
                return $this->redirectToRoute('login');
            }

        }

        return $this->render('ProduitsGMS/register.html.twig', array('form'=> $form->createView()));
    }


    /**
     * @Route("/account/confirm/{token}/{username}", name="confirm_account")
     */
    public function confirmAccount($token, $username)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->findOneBy(['username' => $username]);
        $tokenExist = $user->getConfirmationToken();
        if($token === $tokenExist) {
            $user->setConfirmationToken(null);
            $user->setEnabled(true);
            $em->persist($user);
            $em->flush();
            return $this->redirectToRoute('login');
        } else {
            return $this->render('token_expire.html.twig');
        }
    }




    public function afficheAllGMSAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->findAll();
        $promos = $em->getRepository("AppBundle:Promotion")->byGMS();
        $session = $request->getSession();
        $user = $session->get('user');
        if($user == null)
            $username = '';
        else
            $username = $user->getUsername();
        return $this->render('ProduitsGMS/afficheAllGMS.html.twig', array('gms'=>$gms, 'user'=>$username, 'promo'=>$promos));
    }


    public function afficheGMSAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);
        $promo = $em->getRepository("AppBundle:Promotion")->findOneBy(array('produitgms'=>$gms));
        if($request->getSession()->get('user') == null)
        $user = '';
        else
          $user = $request->getSession()->get('user')->getUsername();
        return $this->render('ProduitsGMS/afficheGMS.html.twig', array('gms'=>$gms, 'user'=>$user,'promo'=>$promo));
    }



    public function serviceGMSAction(Request $request){

        if($this->getUser() == null)
            $user = '';
        else
            $user = $this->getUser()->getUsername();
        return $this->render('ProduitsGMS/serviceGMS.html.twig', array('user'=>$user));
    }

    /**
     * @Route("/affichertout", name="affichertout")
     */
    public function affichertoutAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->findAll();
        $promos = $em->getRepository("AppBundle:Promotion")->byGMS();

        $user = $request->getSession()->get('user');
        return $this->render('ProduitsGMS/affichertout.html.twig',array('user'=>$user, 'chr'=>$gms,'promo'=>$promos));
    }

}
