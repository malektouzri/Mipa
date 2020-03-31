<?php


namespace AppBundle\Controller;


use AppBundle\Service\CartService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends Controller
{

    public function addPanierAction(CartService $cartService, $id){

       $cartService->addPanier($id);

        return $this->redirectToRoute('get_panier');
    }

    /**
     * @Route("/moins/{id}", name="moins")
     */
    public function moinsAction(CartService $cartService, $id){

        $cartService->moins($id);

        return $this->redirectToRoute('get_panier');
    }

    public function getPanierAction(SessionInterface $session){

        $em = $this->getDoctrine()->getManager();
        $panier = $session->get('panier');

        $panierWithData = [];
        foreach ($panier as $id => $qte){
            $panierWithData[] = [
                'produit' => $em->getRepository('AppBundle:Produit_Particulier')->find($id),
                'qte' => $qte
            ];
        }


        $total = 0;
        $idCat = 0;
        if($panierWithData != null){
        foreach ($panierWithData as $item) {
            if($item['produit'] != null){
            $totalItem = $item['produit']->getPrix() * $item['qte'];
            $total += $totalItem;
            $idCat = $item['produit']->getCategories()->getId();
            }
        }
        }

        return $this->render('default/panier.html.twig',array('pdts'=> $panierWithData,'total'=>$total, 'idCat'=>$idCat));
    }

    public function removeItemAction($id, CartService $cartService){

        $cartService->removeItem($id);

        return $this->redirectToRoute('get_panier');
    }





    public function addPanierGMSAction(CartService $cartService, $id){

        $cartService->addPanierGMS($id);

        return $this->redirectToRoute('get_panier_gms');
    }

    public function getPanierGMSAction(SessionInterface $session){

        $em = $this->getDoctrine()->getManager();
        $panier = $session->get('panierGMS', []);
        $panierWithData = [];
        foreach ($panier as $id => $qte){
            $panierWithData[] = [
                'produit' => $em->getRepository('AppBundle:Produit_GMS')->find($id),
                'qte' => $qte
            ];
        }
        // dump($panierWithData);

        $total = 0;
        foreach ($panierWithData as $item) {
            $totalItem = $item['produit']->getPrix() * $item['qte'];
            $total += $totalItem;

        }

        $user = $session->get('user');

        return $this->render('default/panierGMS.html.twig',array('pdts'=> $panierWithData,'total'=>$total, 'user'=>$user));
    }


    public function removeItemGMSAction($id, CartService $cartService){

        $cartService->removeItemGMS($id);

        return $this->redirectToRoute('get_panier_gms');
    }

    /**
     * @Route("/moinsGMS/{id}", name="moinsGMS")
     */
    public function moinsGMSAction(CartService $cartService, $id){

        $cartService->moinsGMS($id);

        return $this->redirectToRoute('get_panier_gms');
    }

}