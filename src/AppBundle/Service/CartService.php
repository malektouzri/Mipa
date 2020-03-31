<?php

namespace AppBundle\Service;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CartService {

    protected $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function addPanier($id) {

        $panier = $this->session->get('panier', []);
        if (!empty($panier[$id])){
            $panier[$id]++;
        }else{
            $panier[$id] = 1;
        }
        $this->session->set('panier', $panier);
    }

    public function moins($id) {

        $panier = $this->session->get('panier', []);
        if ($panier[$id] > 1){
            $panier[$id]--;
        }
        $this->session->set('panier', $panier);

    }

    public function removeItem(int $id) {

        $panier = $this->session->get('panier', []);
        if(!empty($panier[$id])){
            unset($panier[$id]);
        }
        $this->session->set('panier', $panier);
    }








    public function addPanierGMS($id) {

        $panier = $this->session->get('panierGMS', []);
        if (!empty($panier[$id])){
            $panier[$id]++;
        }else{
            $panier[$id] = 1;
        }
        $this->session->set('panierGMS', $panier);
    }

    public function moinsGMS($id) {

        $panier = $this->session->get('panierGMS', []);
        if ($panier[$id] > 1){
            $panier[$id]--;
        }
        $this->session->set('panierGMS', $panier);

    }

    public function removeItemGMS(int $id) {

        $panier = $this->session->get('panierGMS', []);
        if(!empty($panier[$id])){
            unset($panier[$id]);
        }
        $this->session->set('panierGMS', $panier);
    }

}