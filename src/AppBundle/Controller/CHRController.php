<?php


namespace AppBundle\Controller;


use AppBundle\Entity\UserParticulier;
use AppBundle\Form\ProfileUPType;
use AppBundle\Form\UserParticulierType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class CHRController extends Controller
{

    /**
     * @Route("/modif_mdp", name="modif_mdp")
     */
    public function modifPasswordAction(Request $request){
        $this->get('session')->getFlashBag()->clear();
        if(isset($_POST['valider'])){
            if($request->get('password') != $request->get('re_password')){
                $this->addFlash('Erreur', 'Les mots de passe ne sont pas identiques!');
            }else{
                $em = $this->getDoctrine()->getManager();
                $user = $em->getRepository("AppBundle:UserParticulier")->find($request->getSession()->get('user')->getId());
                $user->setPassword($request->get('password'));
                $this->addFlash('Notice', 'Modification effectuée avec succés!');
               return $this->redirectToRoute('profile');
            }
        }
       return $this->render('ProduitsCHR/modif_password.html.twig', array());
    }

    /**
     * @Route("/profile", name="profile")
     *
     */
    public function modifProfileAction(Request $request){

        $this->get('session')->getFlashBag()->clear();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:UserParticulier")->find($request->getSession()->get('user')->getId());

        $ancienUsername = $user->getUsername();
        $ancienEmail = $user->getEmail();
        $regex = '^[1-9]';
        if(isset($_POST['valider'])){
            $usernames = $em->getRepository('AppBundle:UserParticulier')->findOneBy(array('username'=>$request->get('username')));
            $emails =  $em->getRepository('AppBundle:UserParticulier')->findOneBy(array('email'=>$request->get('email')));
           if( $usernames != null && ($request->get('username')!= $ancienUsername)){
               $this->addFlash('Erreur', 'Nom d\'utilisateur déja utilisé!');
           }elseif ($emails != null && ($request->get('email') != $ancienEmail)){
               $this->addFlash('Erreur', 'Adresse mail déja utilisée!');
           } //elseif(!preg_match($regex, $request->get('telephone'))){
              // $this->addFlash('Erreur', 'Numéro de téléphone invalide!');
           //}
           else{
               $user->setUsername($request->get('username'));
               $user->setAdresse($request->get('adresse'));
               $user->setEmail($request->get('email'));
               $user->setNom($request->get('nom'));
               $user->setPrenom($request->get('prenom'));
               $user->setTelephone($request->get('telephone'));
               $user->setNomEntreprise($request->get('nomEntreprise'));
               $user->setAdresseEntreprise($request->get('adresseEntreprise'));
               $user->setEmailEntreprise($request->get('emailEntreprise'));
               $user->setTelephoneEntreprise($request->get('telephoneEntreprise'));
               $em->persist($user);
               $em->flush();
               $this->addFlash('Notice', 'Modification effectuée avec succés!');

           }

        }
        return $this->render('ProduitsCHR/profile.html.twig', array( 'user'=>$user));
    }

    /**
     * @Route("/forgotten_password", name="forgotten_password")
     *
     */
    public function ForgottenPasswordAction( Request $request, \Swift_Mailer $mailer, TokenGeneratorInterface $tokenGenerator)
    {
        if ($request->isMethod('POST')) {

            $email = $request->get('email');

            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository(UserParticulier::class)->findOneBy(array('email'=>$email));
            /* @var $user UserParticulier */

            if ($user === null) {
                $this->addFlash('Erreur', 'Cet email n\'est pas valide');
                return $this->render('ProduitsCHR/forgotten_password.html.twig');
            }
            $token = $tokenGenerator->generateToken();

            try {
                $user->setToken($token);
                $em->flush();
            } catch (\Exception $e) {
                $this->addFlash('Notice', $e->getMessage());
                return $this->render('ProduitsCHR/forgotten_password.html.twig');
            }

            $url = $this->generateUrl('reset_password', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

            $message = (new \Swift_Message('Mot de passe oublié'))
                ->setFrom('noreplymipa@gmail.com')
                ->setTo($user->getEmail())
                ->setBody(
                    "Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe:  " . $url,
                    'text/html'
                );

            $mailer->send($message);

            $this->addFlash('Notice', 'Email envoyé');

            return $this->redirectToRoute('login_part');
        }

        return $this->render('ProduitsCHR/forgotten_password.html.twig');
    }


    /**
     * @Route("/reset_password/{token}", name="reset_password")
     *
     */
    public function ResetPassword(Request $request, string $token)
    {

        if ($request->isMethod('POST')) {
            $em = $this->getDoctrine()->getManager();

            $user = $em->getRepository(UserParticulier::class)->findOneBy(array('token'=>$token));

            if ($user === null) {
                $this->addFlash('Erreur', 'Impossible de mettre à jour le mot de passe');
                return $this->render('ProduitsCHR/reset_password.html.twig', ['token' => $token]);
            }

            $user->setToken(null);
            $user->setPassword($request->get('password'));
            $em->flush();

            $this->addFlash('Notice', 'Mot de passe mis à jour');

            return $this->redirectToRoute('affiche_CategoriesCHR');
        }else {

            return $this->render('ProduitsCHR/reset_password.html.twig', ['token' => $token]);
        }

    }


    /**
     * @Route("/logout_part", name="logout_part")
     */
    public function logoutAction(Request $request){
        $session = $request->getSession();
        $session->remove('user');
        unset($session);

        return $this->redirectToRoute('home_page');
    }

    /**
     * @Route("/login_part", name="login_part")
     */
    public function loginAction(Request $request){
        $this->get('session')->getFlashBag()->clear();
        if(isset($_POST['valider'])){
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository("AppBundle:UserParticulier")->findOneBy(array('username'=>$request->get('username'), 'password'=>$request->get('password')));
            if ($user != null){
                if($user->getEtat() == true){
                    $session = $request->getSession();
                    $session->set('user',$user);
                    $session->start();
                    return $this->redirectToRoute('affiche_CategoriesCHR');
                }else{
                    $this->get('session')->getFlashBag()->add('Notice','Votre compte n\'est pas encore actif. Veuillez nous contacter pour plus d\'informations. Merci');
                }
            } else{
                $this->get('session')->getFlashBag()->add('Erreur','Veuillez vérifier les données saisies!');
            }
        }
        return $this->render('ProduitsCHR/login.html.twig', array());
    }


    /**
     * @Route("/register_part", name="register_part")
     */
    public function registerAction(Request $request, \Swift_Mailer $mailer){

        $this->get('session')->getFlashBag()->clear();
        $form = $this->createForm(UserParticulierType::class);
        $form->handleRequest($request);
        $regex = '#^0[6-7]{1}\d{8}$#';
        $em = $this->getDoctrine()->getManager();
        if($form->isValid() && $form->isSubmitted()){
            $usernames = $em->getRepository('AppBundle:UserParticulier')->findOneBy(array('username'=>$request->get('username')));
            $emails =  $em->getRepository('AppBundle:UserParticulier')->findOneBy(array('email'=>$request->get('email')));
            if( $usernames != null ){
                $this->addFlash('Erreur', 'Nom d\'utilisateur déja utilisé!');
            }elseif ($emails != null ){
                $this->addFlash('Erreur', 'Adresse mail déja utilisée!');
            }
            //elseif(!preg_match($regex, $form['telephone']->getData())){
              //  $this->get('session')->getFlashBag()->add('Erreur','Numéro de téléphone invalide!');

        //    }
        else{

                $user = new UserParticulier();
                $user->setAdresse($form['adresse']->getData());
                $user->setEmail($form['email']->getData());
                $user->setNom($form['nom']->getData());
                $user->setPrenom($form['prenom']->getData());
                $user->setPassword($form['password']->getData());
                $user->setUsername($form['username']->getData());
                $user->setTelephone($form['telephone']->getData());
                $user->setRoles(array('ROLE_CHR'));
                $user->setNomEntreprise($form['nomEntreprise']->getData());
                $user->setAdresseEntreprise($form['adresseEntreprise']->getData());
                $user->setEmailEntreprise($form['emailEntreprise']->getData());
                $user->setTelephoneEntreprise($form['telephoneEntreprise']->getData());
                $user->setSalt('');
                $user->setEtat(false);
                $em->persist($user);
                $em->flush();
                $this->notifyAdminAction($mailer,$user);

                $this->get('session')->getFlashBag()->add('Notice','Opération effectuée avec succés, vous recevrez un mail de validation pour votre compte par l\'équipe MIPA. Merci. !');

            }

        }

        return $this->render('ProduitsCHR/register.html.twig', array('form'=> $form->createView()));

    }

    /**
     * @Route("/notifyAdmin/{user}", name="notifyAdmin")
     */
    public function notifyAdminAction($mailer,$user){

        $message = (new \Swift_Message('Demande d\'inscription chez MIPA'))
            ->setFrom('noreplymipa@mipa.com')
            ->setTo('noreplymipa@gmail.com')//email mipa
            ->setBody($this->renderView('Admin/email_validation.email.twig', [
                'user' => $user
            ]), 'text/html');
        $mailer->send($message);
    }

    /**
     * @Route("/searchchr", name="searchchr")
     */
    public function searchAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:Produit_Particulier')->byLibelle($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getLibelle());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('ProduitsCHR/recherchechr.html.twig',array());
    }

    /**
     * @Route("/recherchechr", name="recherchechr")
     */
    public function recherchechrAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $promos = $em->getRepository("AppBundle:Promotion")->byCHR();

        $user = $request->getSession()->get('user');
        $gms = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $gms = $em->getRepository("AppBundle:Produit_Particulier")->byLibelle($request->get('ref'));
                if($gms != null){
                    return $this->render('ProduitsCHR/recherchechr.html.twig',array('pdts'=>$gms, 'user'=>$user, 'promo'=>$promos));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('ProduitsCHR/recherchechr.html.twig',array('pdts'=>$gms, 'user'=>$user, 'promo'=>$promos));
    }


    public function afficheCategoriesCHRAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT c
        FROM AppBundle:Categorie_Particulier c '
        );
        $query->setMaxResults(5);
        $cat = $query->getArrayResult();
        $query1 = $em->createQuery(
            'SELECT c
        FROM AppBundle:Categorie_Particulier c '
        );
        $query1->setFirstResult(5);
        $query1->setMaxResults(5);
        $cat1 = $query1->getArrayResult();

        $promos = $em->getRepository("AppBundle:Promotion")->byCHR();
        return $this->render('ProduitsCHR/afficheCategoriesCHR.html.twig', array('cat'=>$cat,'cat1'=>$cat1, 'promo'=>$promos));
    }

    public function afficheCategorieAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $promos = $em->getRepository("AppBundle:Promotion")->byCHR();
        $cat = $em->getRepository("AppBundle:Categorie_Particulier")->find($id);
        $chr = $em->getRepository("AppBundle:Produit_Particulier")->findBy(array('categories'=>$id));
        return $this->render('ProduitsCHR/afficheCategorie.html.twig', array('cat'=>$cat, 'chr'=>$chr, 'promo'=>$promos));
    }

    public function afficheCHRAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $chr = $em->getRepository("AppBundle:Produit_Particulier")->find($id);
        $promo = $em->getRepository("AppBundle:Promotion")->findOneBy(array('produitchr'=>$chr));

        return $this->render('ProduitsCHR/afficheCHR.html.twig', array('chr'=>$chr, 'promo'=>$promo));
    }

    public function serviceCHRAction(){


        return $this->render('ProduitsCHR/serviceCHR.html.twig', array());
    }

}