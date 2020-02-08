<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Produit_GMS;
use AppBundle\Form\FichierType;
use AppBundle\Form\Produit_GMSType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class GMSController extends Controller
{
    public function ajoutGMSAction (Request $request){

        $gms = new Produit_GMS();
        $form = $this->createForm(Produit_GMSType::class, $gms);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $produitFile = $form->get('filename')->getData();

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

            $em = $this->getDoctrine()->getManager();
            $em->persist($gms);
            $em->flush();
        }

        return $this->render('ProduitsGMS/ajoutGMS.html.twig', array('form'=>$form->createView()));
    }

    public function afficheAllGMSAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->findAll();
        return $this->render('ProduitsGMS/afficheAllGMS.html.twig', array('gms'=>$gms));
    }

    public function afficheGMSAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);
        return $this->render('ProduitsGMS/afficheGMS.html.twig', array('gms'=>$gms));
    }

    public function supprimerGMSAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);
        $em->remove($gms);
        $em->flush();
    }

    public function modifierGMSAction(Request $request, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $gms = $em->getRepository("AppBundle:Produit_GMS")->find($id);
        $form = $this->createForm(FichierType::class);
        $form->handleRequest($request);

        if(isset($_POST['valider'])){
            $produitFile = $form->get('filename')->getData();
            if (!empty($produitFile)) {
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
            if(!empty($request->get('libelle'))&& !empty($request->get('description'))){
                $gms->setLibelle($request->get('libelle'));
                $gms->setDescription($request->get('description'));

                $em = $this->getDoctrine()->getManager();
                $em->persist($gms);
                $em->flush();
                $this->get('session')->getFlashBag()->add('Notice','Modification effectuée avec succés!');
            }else{
                $this->get('session')->getFlashBag()->add('Erreur','Veuillez remplir tous les champs!');
            }

        }

        return $this->render('ProduitsGMS/modifierGMS.html.twig', array('gms'=>$gms, 'form'=>$form->createView()));
    }

}
