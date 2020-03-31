<?php


namespace AppBundle\Controller;


use AppBundle\Entity\Categorie_Particulier;
use AppBundle\Entity\Produit_GMS;
use AppBundle\Entity\Produit_Particulier;
use AppBundle\Entity\Promotion;
use AppBundle\Form\CategorieType;
use AppBundle\Form\FichierType;
use AppBundle\Form\Produit_CHRType;
use AppBundle\Form\Produit_GMSType;
use AppBundle\Form\PromotionType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends Controller
{

    /**
     * @Route("/ajoutGMS", name="ajoutGMS")
     */
    public function ajoutGMSAction (Request $request){

        $gms = new Produit_GMS();
        $form = $this->createForm(Produit_GMSType::class, $gms);
        $form->handleRequest($request);
        //$this->get('session')->getFlashBag()->clear();
        if($form->isSubmitted() && $form->isValid()){

            $produitFile = $form['filename']->getData();

            if ($produitFile) {
                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $gms->setFilename($newFilename);
            }
            $gms->setDescription($form['description']->getData());
            $gms->setLibelle($form['libelle']->getData());
            $gms->setReference($form['reference']->getData());
            $gms->setPrix($form['prix']->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($gms);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Produit ajouté avec succés!');

        }

        return $this->render('Admin/ajoutGMS.html.twig', array('form'=>$form->createView()));
    }


    /**
     * @Route("/ajoutCategorie", name="ajoutCategorie")
     */
    public function ajoutCategorieAction (Request $request){

        $cat = new Categorie_Particulier();
        $form = $this->createForm(CategorieType::class, $cat);
        $form->handleRequest($request);
        //$this->get('session')->getFlashBag()->clear();
        if($form->isSubmitted() && $form->isValid()){

            $produitFile = $form['filename']->getData();

            if ($produitFile) {
                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $cat->setFilename($newFilename);
            }
            $cat->setNom($form['nom']->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($cat);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Catégorie ajouté avec succés!');


        }

        return $this->render('Admin/ajoutCategorie.html.twig', array('form'=>$form->createView()));
    }

    /**
     * @Route("/ajoutchr", name="ajoutchr")
     */
    public function ajoutChrAction (Request $request){

        $pdt = new Produit_Particulier();
        $form = $this->createForm(Produit_CHRType::class, $pdt);
        $form->handleRequest($request);
        //$this->get('session')->getFlashBag()->clear();
        if($form->isSubmitted() && $form->isValid()){

            $produitFile = $form['filename']->getData();

            if ($produitFile) {
                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $pdt->setFilename($newFilename);
            }
            $pdt->setDescription($form['description']->getData());
            $pdt->setLibelle($form['libelle']->getData());
            $pdt->setReference($form['reference']->getData());
            $pdt->setPrix($form['prix']->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($pdt);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Produit ajouté avec succés!');


        }

        return $this->render('Admin/ajoutchr.html.twig', array('form'=>$form->createView()));
    }


    /**
     * @Route("/afficheallchr", name="afficheallchr")
     */
    public function afficheallchrAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:Produit_Particulier")->findAll();
        return $this->render('Admin/afficheallchr.html.twig', array('pdts'=>$pdts));
    }


    /**
     * @Route("/afficheallcmd", name="afficheallcmd")
     */
    public function afficheallcmdAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:Commande")->findAll();
        return $this->render('Admin/afficheallcmd.html.twig', array('pdts'=>$pdts));
    }

    /**
     * @Route("/afficheallcmdgms", name="afficheallcmdgms")
     */
    public function afficheallcmdgmsAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:CommandeGMS")->findAll();
        return $this->render('Admin/afficheallcmdgms.html.twig', array('pdts'=>$pdts));
    }

    /**
     * @Route("/affichecmdattente", name="affichecmdattente")
     */
    public function affichecmdattenteAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:Commande")->cmdAttenteByDate();
        return $this->render('Admin/affichecmdattente.html.twig', array('pdts'=>$pdts));
    }

    /**
     * @Route("/affichecmdgmsattente", name="affichecmdgmsattente")
     */
    public function affichecmdgmsattenteAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:CommandeGMS")->cmdAttenteByDate();
        return $this->render('Admin/affichecmdgmsattente.html.twig', array('pdts'=>$pdts));
    }

    /**
     * @Route("/affichealluser", name="affichealluser")
     */
    public function affichealluserAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository("AppBundle:User")->findAll();
        return $this->render('Admin/affichealluser.html.twig', array('pdts'=>$users));
    }

    /**
     * @Route("/afficheallpart", name="afficheallpart")
     */
    public function afficheallpartAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $parts = $em->getRepository("AppBundle:UserParticulier")->findAll();
        return $this->render('Admin/afficheallpart.html.twig', array('parts'=>$parts));
    }

    /**
     * @Route("/afficheallcat", name="afficheallcat")
     */
    public function afficheallcatAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $cats = $em->getRepository("AppBundle:Categorie_Particulier")->findAll();
        return $this->render('Admin/afficheallcat.html.twig', array('cats'=>$cats));
    }

    /**
     * @Route("/afficheallgms", name="afficheallgms")
     */
    public function afficheallgmsAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $pdts = $em->getRepository("AppBundle:Produit_GMS")->findAll();
        return $this->render('Admin/afficheallgms.html.twig', array('pdts'=>$pdts));
    }

    /**
     * @Route("/supprimergms/{id}", name="supprimergms")
     */
    public function supprimerGMSAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);
        $em->remove($gms);
        $em->flush();

        return $this->redirectToRoute('afficheallgms');
    }

    /**
     * @Route("/supprimerpromo/{id}", name="supprimerpromo")
     */
    public function supprimerpromoAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Promotion")->find($id);
        $em->remove($gms);
        $em->flush();

        return $this->redirectToRoute('afficheallpromo');
    }

    /**
     * @Route("/supprimercmd/{id}", name="supprimercmd")
     */
    public function supprimercmdAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Commande")->find($id);
        $em->remove($gms);
        $em->flush();

        return $this->redirectToRoute('afficheallcmd');
    }

    /**
     * @Route("/supprimercmdgms/{id}", name="supprimercmdgms")
     */
    public function supprimercmdgmsAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:CommandeGMS")->find($id);
        $em->remove($gms);
        $em->flush();

        return $this->redirectToRoute('afficheallcmdgms');
    }

    /**
     * @Route("/supprimeruser/{id}", name="supprimeruser")
     */
    public function supprimeruserAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:User")->find($id);
        $em->remove($user);
        $em->flush();

        return $this->redirectToRoute('affichealluser');
    }


    /**
     * @Route("/supprimerchr/{id}", name="supprimerchr")
     */
    public function supprimerchrAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $chr = $em->getRepository("AppBundle:Produit_Particulier")->find($id);
        $em->remove($chr);
        $em->flush();

        return $this->redirectToRoute('afficheallchr');
    }

    /**
     * @Route("/refchr", name="refchr")
     */
    public function refchrAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:Produit_Particulier')->byRef($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getReference());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/recherchechr.html.twig',array());
    }

    /**
     * @Route("/refgms", name="refgms")
     */
    public function refgmsAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:Produit_GMS')->byRef($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getReference());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/recherchegms.html.twig',array());
    }

    /**
     * @Route("/nomEntreprise", name="nomEntreprise")
     */
    public function nomEntrepriseAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:UserParticulier')->byNomEntreprise($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getNomEntreprise());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/recherchepart.html.twig',array());
    }

    /**
     * @Route("/emailuser", name="emailuser")
     */
    public function emailuserAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:User')->byEmail($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getEmail());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/rechercheuser.html.twig',array());
    }

    /**
     * @Route("/datecmd", name="datecmd")
     */
    public function datecmdAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:Commande')->byDate($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getDate());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/recherchecmd.html.twig',array());
    }

    /**
     * @Route("/datecmdgms", name="datecmdgms")
     */
    public function datecmdgmsAction(Request $request){
        if ($request->isXmlHttpRequest()){
            $search = $request->request->get('search');

            $em = $this->getDoctrine()->getManager();
            $chr = $em->getRepository('AppBundle:CommandeGMS')->byDate($search);
            $response =   array();
            if ($chr != null){
                foreach ($chr as $c){
                    $response[] = array("label"=>$c->getDate());
                }
                return new JsonResponse($response);
            }
        }
        return $this->render('Admin/recherchecmdgms.html.twig',array());
    }


    /**
     * @Route("/recherchecmd", name="recherchecmd")
     */
    public function recherchecmdAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $chr = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $chr = $em->getRepository("AppBundle:Commande")->findBy(array('date'=>new \DateTime($request->get('ref'))));
                if($chr != null){
                    return $this->render('Admin/recherchecmd.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('Admin/recherchecmd.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }

    /**
     * @Route("/recherchecmdgms", name="recherchecmdgms")
     */
    public function recherchecmdgmsAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $chr = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $chr = $em->getRepository("AppBundle:CommandeGMS")->findBy(array('date'=>new \DateTime($request->get('ref'))));
                if($chr != null){
                    return $this->render('Admin/recherchecmdgms.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('Admin/recherchecmdgms.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }

    /**
     * @Route("/rechercheuser", name="rechercheuser")
     */
    public function rechercheuserAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $chr = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $chr = $em->getRepository("AppBundle:User")->findBy(array('email'=>$request->get('ref')));
                if($chr != null){
                    return $this->render('Admin/rechercheuser.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('Admin/rechercheuser.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }

    /**
     * @Route("/recherchepart", name="recherchepart")
     */
    public function recherchepartAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $chr = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $chr = $em->getRepository("AppBundle:UserParticulier")->findBy(array('nomEntreprise'=>$request->get('ref')));
                if($chr != null){
                    return $this->render('Admin/recherchepart.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('Admin/recherchepart.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }


    /**
     * @Route("/recherchegms", name="recherchegms")
     */
    public function recherchegmsAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $chr = null;
        if(isset($_POST['valider'])){
            if(!empty($request->get('ref'))){
                $chr = $em->getRepository("AppBundle:Produit_GMS")->findBy(array('reference'=>$request->get('ref')));
                if($chr != null){
                    return $this->render('Admin/recherchegms.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
                }else{
                    $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
                }
            }
        }
        return $this->render('Admin/recherchegms.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }

    /**
     * @Route("/recherchechr", name="recherchechr")
     */
    public function recherchechrAction(Request $request){

       $em = $this->getDoctrine()->getManager();
       $chr = null;
       if(isset($_POST['valider'])){
           if(!empty($request->get('ref'))){
               $chr = $em->getRepository("AppBundle:Produit_Particulier")->findBy(array('reference'=>$request->get('ref')));
               if($chr != null){
                   return $this->render('Admin/recherchechr.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
               }else{
                   $this->get('session')->getFlashBag()->add('Erreur', 'Aucun résultat!');
               }
           }
       }
       return $this->render('Admin/recherchechr.html.twig',array('ref'=>$request->get('ref'), 'pdts'=>$chr));
    }

    /**
     * @Route("/refuser/{id}", name="refuser")
     */
    public function refuserAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $chr = $em->getRepository("AppBundle:UserParticulier")->find($id);
        $cmd = $em->getRepository("AppBundle:Commande")->findBy(array('idUser'=>$chr->getId()));
        foreach ($cmd as $c){
            $c->setIdProduit(null);
            $em->remove($c);
            $em->flush();
        }
        $em->remove($chr);
        $em->flush();

        return $this->redirectToRoute('afficheallnotif');
    }

    /**
     * @Route("/supprimerpart/{id}", name="supprimerpart")
     */
    public function supprimerpartAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $part = $em->getRepository("AppBundle:UserParticulier")->find($id);
        $em->remove($part);
        $em->flush();

        return $this->redirectToRoute('afficheallpart');
    }

    /**
     * @Route("/supprimercat/{id}", name="supprimercat")
     */
    public function supprimerCatAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $cat = $em->getRepository("AppBundle:Categorie_Particulier")->find($id);
        $em->remove($cat);
        $em->flush();

        return $this->redirectToRoute('afficheallcat');
    }

    /**
     * @Route("/modifiercat/{id}", name="modifiercat")
     */
    public function modifierCatAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $cat = $em->getRepository("AppBundle:Categorie_Particulier")->find($id);


        if(isset($_POST['valider'])){
            $produitFile = $request->files->get('fichier');
            if ($produitFile != null) {
                /**
                 * @var UploadedFile $file
                 */
                // $file = $doc->getFichier();
                $cat->setFilename(null);
                $em->persist($cat);
                $em->flush();

                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $cat->setFilename($newFilename);
                $this->get('session')->getFlashBag()->add('Notice','not null!');

            }else{
                /**
                 * @var UploadedFile $file
                 */
                $cat->setFilename($cat->getFilename());
                $this->get('session')->getFlashBag()->add('Notice','null');

            }
            $cat->setNom($request->get('nom'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($cat);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('afficheallcat');


        }

        return $this->render('Admin/modifiercat.html.twig', array('p'=>$cat));
    }


    /**
     * @Route("/modifiercmd/{id}", name="modifiercmd")
     */
    public function modifierCmdAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $cat = $em->getRepository("AppBundle:Commande")->find($id);
        if(isset($_POST['valider'])){

            $cat->setEtat($request->get('etat'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($cat);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('afficheallcmd');


        }

        return $this->render('Admin/modifiercmd.html.twig', array('p'=>$cat));
    }

    /**
     * @Route("/modifiercmdgms/{id}", name="modifiercmdgms")
     */
    public function modifierCmdgmsAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $cat = $em->getRepository("AppBundle:CommandeGMS")->find($id);
        if(isset($_POST['valider'])){

            $cat->setEtat($request->get('etat'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($cat);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('afficheallcmdgms');


        }

        return $this->render('Admin/modifiercmdgms.html.twig', array('p'=>$cat));
    }


    /**
     * @Route("/modifieradmin/{id}", name="modifieradmin")
     */
    public function modifieradminAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $admin = $em->getRepository("AppBundle:Admin")->find($id);


        if(isset($_POST['valider'])){

            if($request->get('password') != $request->get('repassword')){
                $this->get('session')->getFlashBag()->add('Erreur','Les mots de passe ne correspondent pas!');
            }else{
                $admin->setUsername($request->get('username'));
                $admin->setPassword($request->get('password'));

                $em = $this->getDoctrine()->getManager();
                $em->persist($admin);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
                return $this->redirectToRoute('home');
            }



        }

        return $this->render('Admin/modifieradmin.html.twig', array('p'=>$admin));
    }


    /**
     * @Route("/modifiergms/{id}", name="modifiergms")
     */
    public function modifierGMSAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);


        if(isset($_POST['valider'])){
            $produitFile = $request->files->get('fichier');
            if ($produitFile != null) {
                /**
                 * @var UploadedFile $file
                 */
                // $file = $doc->getFichier();
                $gms->setFilename(null);
                $em->persist($gms);
                $em->flush();

                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $gms->setFilename($newFilename);
                $this->get('session')->getFlashBag()->add('Notice','not null!');

            }else{
                /**
                 * @var UploadedFile $file
                 */
                $gms->setFilename($gms->getFilename());
                $this->get('session')->getFlashBag()->add('Notice','null');

            }
                $gms->setLibelle($request->get('libelle'));
                $gms->setDescription($request->get('description'));
                $gms->setPrix($request->get('prix'));
                $gms->setReference($request->get('reference'));

                $em = $this->getDoctrine()->getManager();
                $em->persist($gms);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
                return $this->redirectToRoute('afficheallgms');


        }

        return $this->render('Admin/modifierGMS.html.twig', array('p'=>$gms));
    }

    /**
     * @Route("/modifierpart/{id}", name="modifierpart")
     */
    public function modifierpartAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $part = $em->getRepository("AppBundle:UserParticulier")->find($id);


        if(isset($_POST['valider'])){

            $part->setPrenom($request->get('prenom'));
            $part->setNom($request->get('nom'));
            $part->setAdresse($request->get('adresse'));
            $part->setEmail($request->get('email'));
            $part->setTelephone($request->get('telephone'));
            $part->setUsername($request->get('username'));
            $part->setNomEntreprise($request->get('nomEntreprise'));
            $part->setAdresseEntreprise($request->get('adresseEntreprise'));
            $part->setEmailEntreprise($request->get('emailEntreprise'));
            $part->setTelephoneEntreprise($request->get('telephoneEntreprise'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($part);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('afficheallpart');


        }

        return $this->render('Admin/modifierpart.html.twig', array('p'=>$part));
    }


    /**
     * @Route("/modifieruser/{id}", name="modifieruser")
     */
    public function modifieruserAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:User")->find($id);


        if(isset($_POST['valider'])){

            $user->setPrenom($request->get('prenom'));
            $user->setNom($request->get('nom'));
            $user->setAdresse($request->get('adresse'));
            $user->setEmail($request->get('email'));
            $user->setTelephone($request->get('telephone'));
            $user->setUsername($request->get('username'));


            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('affichealluser');


        }

        return $this->render('Admin/modifieruser.html.twig', array('p'=>$user));
    }

    /**
     * @Route("/modifierchr/{id}", name="modifierchr")
     */
    public function modifierchrAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $chr = $em->getRepository("AppBundle:Produit_Particulier")->find($id);
        $cats = $em->getRepository("AppBundle:Categorie_Particulier")->findAll();

        if(isset($_POST['valider'])){
            $produitFile = $request->files->get('fichier');
            if ($produitFile != null) {
                /**
                 * @var UploadedFile $file
                 */
                // $file = $doc->getFichier();
                $chr->setFilename(null);
                $em->persist($chr);
                $em->flush();

                $originalFilename = pathinfo($produitFile->getClientOriginalName(), PATHINFO_FILENAME);
                iconv('UTF-8', 'ASCII//TRANSLIT', $originalFilename);
                $newFilename = $originalFilename.'-'.uniqid().'.'.$produitFile->guessExtension();


                try {
                    $produitFile->move(
                        $this->getParameter('image_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }

                $chr->setFilename($newFilename);
                $this->get('session')->getFlashBag()->add('Notice','not null!');

            }else{
                /**
                 * @var UploadedFile $file
                 */
                $chr->setFilename($chr->getFilename());
                $this->get('session')->getFlashBag()->add('Notice','null');

            }
            $chr->setLibelle($request->get('libelle'));
            $chr->setDescription($request->get('description'));
            $chr->setPrix($request->get('prix'));
            $chr->setReference($request->get('reference'));
            $cat = $em->getRepository("AppBundle:Categorie_Particulier")->find($request->get('categories'));
            $chr->setCategories($cat);

            $em = $this->getDoctrine()->getManager();
            $em->persist($chr);
            $em->flush();
            $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            return $this->redirectToRoute('afficheallchr');


        }

        return $this->render('Admin/modifierchr.html.twig', array('p'=>$chr, 'cats'=>$cats));
    }

    /**
     * @Route("/modifierpromo/{id}", name="modifierpromo")
     */
    public function modifierpromoAction(Request $request, $id)
    {
        $this->get('session')->getFlashBag()->clear();

        $em = $this->getDoctrine()->getManager();
        $promo = $em->getRepository("AppBundle:Promotion")->find($id);
        $chrs = $em->getRepository("AppBundle:Produit_Particulier")->findAll();
        $gmss = $em->getRepository("AppBundle:Produit_GMS")->findAll();

        if(isset($_POST['valider'])){

            $promo->setDescription($request->get('description'));
            $promo->setPourcentage($request->get('pourcentage'));
            $promo->setDateDebut(new \DateTime($request->get('dateDebut')));
            $promo->setDateFin(new \DateTime($request->get('dateFin')));

            if(!empty($request->get('produitchr'))){
                $chr = $em->getRepository("AppBundle:Produit_Particulier")->find($request->get('produitchr'));
                $promo->setProduitchr($chr);
                $em = $this->getDoctrine()->getManager();
                $em->persist($promo);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            }elseif (!empty($request->get('produitgms'))){
                $gms = $em->getRepository("AppBundle:Produit_GMS")->find($request->get('produitgms'));
                $promo->setProduitgms($gms);
                $em = $this->getDoctrine()->getManager();
                $em->persist($promo);
                $em->flush();
            }

            return $this->redirectToRoute('afficheallpromo');


        }

        return $this->render('Admin/modifierpromo.html.twig', array('chr'=>$chrs, 'gms'=>$gmss, 'p'=>$promo));
    }

    /**
     * @Route("/home", name="home")
     */
    public function homeAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $admin = $em->getRepository("AppBundle:Admin")->find(1);
        $nb = $em->getRepository("AppBundle:UserParticulier")->getNb();
        $cmd = $em->getRepository("AppBundle:Commande")->getNb();
        $cmdgms = $em->getRepository("AppBundle:CommandeGMS")->getNb();

        return $this->render('Admin/home.html.twig', array('p'=>$admin,'nb'=>$nb, 'cmd'=> $cmd, 'cmdgms'=>$cmdgms));
    }

    /**
     * @Route("/afficheallnotif", name="afficheallnotif")
     */
    public function afficheallnotifAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository("AppBundle:UserParticulier")->findBy(array('etat'=>false));
        return $this->render('Admin/afficheallnotif.html.twig', array('users'=>$users));
    }

    /**
     * @Route("/accepternotif/{id}", name="accepternotif")
     */
    public function accepternotifAction(Request $request,$id){

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:UserParticulier")->find($id);
        $user->setEtat(1);
        $em->persist($user);
        $em->flush();
        return $this->redirectToRoute('afficheallnotif');
    }

    /**
     * @Route("/acceptercmd/{id}", name="acceptercmd")
     */
    public function acceptercmdAction(Request $request,$id, \Swift_Mailer $mailer){

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:Commande")->find($id);

        $cmd = $em->getRepository("AppBundle:Commande")->findBy(array('idUser'=>$user->getIdUser()->getId(), 'etat'=>'En cours'));
        foreach ($cmd as $c){
            $c->setEtat('Traitée');
            $em->persist($c);
            $em->flush();
        }
        $message = (new \Swift_Message('Confirmation de votre commande'))
            ->setFrom('noreplymipa@mipa.com')
            ->setTo($user->getIdUser()->getEmail())
            ->setBody('Votre commande du '.$user->getDate()->format('d-m-Y').' pour '.$user->getQuantite().' vient d\'être traitée.
            Amicalement l\'équipe MIPA' );
        $mailer->send($message);

        return $this->redirectToRoute('affichecmdattente');
    }


    /**
     * @Route("/acceptercmdgms/{id}", name="acceptercmdgms")
     */
    public function acceptercmdgmsAction(Request $request,$id, \Swift_Mailer $mailer){

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:CommandeGMS")->find($id);
        $cmd = $em->getRepository("AppBundle:CommandeGMS")->findBy(array('idUser'=>$user->getIdUser()->getId(), 'etat'=>'En cours'));
        foreach ($cmd as $c){
            $c->setEtat('Traitée');
            $em->persist($c);
            $em->flush();
        }
        $message = (new \Swift_Message('Confirmation de votre commande'))
            ->setFrom('noreplymipa@mipa.com')
            ->setTo($user->getIdUser()->getEmail())
            ->setBody('Votre commande du '.$user->getDate()->format('d-m-Y').' vient d\'être traitée.
            Amicalement l\'équipe MIPA' );
        $mailer->send($message);

        return $this->redirectToRoute('affichecmdgmsattente');
    }

    /**
     * @Route("/detailnotif/{id}", name="detailnotif")
     */
    public function detailnotifAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:UserParticulier")->find($id);
        return $this->render('Admin/detailnotif.html.twig', array('e'=>$user));
    }

    /**
     * @Route("/detailcmd/{idUser}/{id}", name="detailcmd")
     */
    public function detailcmdAction(Request $request,$idUser, $id){

        $em = $this->getDoctrine()->getManager();
        $cmd = $em->getRepository("AppBundle:Commande")->findBy(array('idUser'=>$idUser, 'etat'=>'En cours'));

        $total = 0;
        foreach ($cmd as $c){
            $total += $c->getIdProduit()->getPrix() * $c->getQuantite();
        }
        $user = $em->getRepository("AppBundle:Commande")->find($id);

        return $this->render('Admin/detailcmd.html.twig', array('e'=>$cmd, 'user'=>$user, 'total'=>$total));
    }

    /**
     * @Route("/detailcmdgms/{idUser}/{id}", name="detailcmdgms")
     */
    public function detailcmdgmsAction(Request $request, $idUser, $id){

        $em = $this->getDoctrine()->getManager();
        $cmd = $em->getRepository("AppBundle:CommandeGMS")->findBy(array('idUser'=>$idUser, 'etat'=>'En cours'));
        $total = 0;
        foreach ($cmd as $c){
            $total += $c->getIdProduit()->getPrix() * $c->getQuantite();
        }
        $user = $em->getRepository("AppBundle:CommandeGMS")->find($id);
        return $this->render('Admin/detailcmdgms.html.twig', array('cmd'=>$cmd, 'user'=>$user, 'total'=>$total));
    }

    /**
     * @Route("/logout_admin", name="logout_admin")
     */
    public function logoutAction(Request $request){
        $session = $request->getSession();
        $session->remove('admin');
        unset($session);

        return $this->redirectToRoute('login_admin');
    }


    /**
     * @Route("/login_admin", name="login_admin")
     */
    public function loginAction(Request $request){
       $this->get('session')->getFlashBag()->clear();
        if(isset($_POST['cnx'])){
            $em = $this->getDoctrine()->getManager();
            $admin = $em->getRepository("AppBundle:Admin")->findOneBy(array('username'=>$request->get('username'), 'password'=>$request->get('password')));
            if ($admin != null){

                    $session = $request->getSession();
                    $session->set('admin',$admin);
                    $session->start();
                    return $this->redirectToRoute('home');

            } else{
                $this->get('session')->getFlashBag()->add('Erreur','Veuillez vérifier les données saisies!');
            }
        }
        return $this->render('Admin/login.html.twig', array());
    }


    /**
     * @Route("/afficheallpromo", name="afficheallpromo")
     */
    public function afficheallpromoAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $promos = $em->getRepository("AppBundle:Promotion")->findAll();
        $now = new \DateTime('now');

        foreach ($promos as $p){
            if ($p->getDateFin() < $now){
                $em->remove($p);
                $em->flush();
            }
        }
        return $this->render('Admin/afficheallpromo.html.twig', array('promos'=>$promos));
    }


    /**
     * @Route("/ajoutpromo", name="ajoutpromo")
     */
    public function ajoutpromoAction(Request $request){

        $promo = new Promotion();
        $form = $this->createForm(PromotionType::class, $promo);
        $form->handleRequest($request);
        $em = $this->getDoctrine()->getManager();
        $this->get('session')->getFlashBag()->clear();
        $chrs = $em->getRepository("AppBundle:Produit_Particulier")->findAll();
        $gmss = $em->getRepository("AppBundle:Produit_GMS")->findAll();
        if(isset($_POST['valider'])){

            $promo->setPourcentage($form['pourcentage']->getData());
            $promo->setDescription($form['description']->getData());
            $promo->setDateDebut(new \DateTime($request->get('dateDebut')));
            $promo->setDateFin(new \DateTime($request->get('dateFin')));

            if(!empty($request->get('produitchr')) && empty($request->get('produitgms'))){
                $chr = $em->getRepository("AppBundle:Produit_Particulier")->find($request->get('produitchr'));
                $promo->setProduitchr($chr);
                $promo->setProduitgms(null);
                $em->persist($promo);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Ajout effectué avec succés!');
            }elseif (!empty($request->get('produitgms')) && empty($request->get('produitchr'))) {
                $gms = $em->getRepository("AppBundle:Produit_GMS")->find($request->get('produitgms'));
                $promo->setProduitgms($gms);
                $promo->setProduitchr(null);
                $em->persist($promo);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Ajout effectué avec succés!');
            }elseif (empty($request->get('produitchr')) && empty($request->get('produitgms'))){
                $this->get('session')->getFlashBag()->add('Erreur','Veuillez sélectionnez un produit!');
            }elseif (!empty($request->get('produitchr')) && !empty($request->get('produitgms'))){
                $this->get('session')->getFlashBag()->add('Erreur','Veuillez sélectionnez un seul produit!');
            }

        }
        return $this->render('Admin/ajoutpromo.html.twig', array('form'=>$form->createView(),'chr'=>$chrs,'gms'=>$gmss));
    }

}