<?php


namespace AppBundle\Controller;


use AppBundle\Entity\Commande;
use AppBundle\Entity\CommandeGMS;
use AppBundle\Entity\UserParticulier;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CommandeController extends Controller
{
    public function checkoutCHRAction(Request $request, SessionInterface $session){
        if ($request->isXmlHttpRequest()){
        $em = $this->getDoctrine()->getManager();
        $panier = $session->get('panier', []);
        $panierWithData = [];
        foreach ($panier as $id => $qte){
            $panierWithData[] = [
                'produit' => $em->getRepository('AppBundle:Produit_Particulier')->find($id),
                'qte' => $qte
            ];
        }
        // dump($panierWithData);

        $total = 0;
        foreach ($panierWithData as $item) {
            if($item['produit'] != null){
            $totalItem = $item['produit']->getPrix() * $item['qte'];
            $total += $totalItem;
            $cmd = new Commande();
            $cmd->setIdProduit($item['produit']);
            $user = $em->getRepository("AppBundle:UserParticulier")->find($request->getSession()->get('user')->getId());
            $cmd->setIdUser($user);
            //$data = $request->request->get('data');
            $cmd->setQuantite($item['qte']);
            $cmd->setDate(new \DateTime('now'));
            $cmd->setEtat("En cours");
            $cmd->setSupp(false);
            $em->persist($cmd);
            $em->flush();

        }}
        $jsonData = 'success';
        $session->set('panier', []);
        }else{
            $jsonData = 'failed';
        }
        return new JsonResponse($jsonData);
    }

    public function afficheCmdAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $user = $request->getSession()->get('user');
        $cmd = $em->getRepository('AppBundle:Commande')->cmdOrderByDate($user->getId());
        return $this->render('ProduitsCHR/afficheCmd.html.twig',array('cmd'=>$cmd));
    }

    public function supprimerCmdAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $cmd = $em->getRepository("AppBundle:Commande")->find($id);
        $cmd->setSupp(true);
        $em->persist($cmd);
        $em->flush();
        return $this->redirectToRoute('affiche_cmd');
    }


    public function checkoutGMSAction(Request $request, SessionInterface $session, \Swift_Mailer $mailer){
        if ($request->isXmlHttpRequest()){
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
                if($item['produit'] != null){
                $totalItem = $item['produit']->getPrix() * $item['qte'];
                $total += $totalItem;
                $cmd = new CommandeGMS();
                $cmd->setIdProduit($item['produit']);
                $user = $em->getRepository("AppBundle:User")->find($request->getSession()->get('user')->getId());
                $cmd->setIdUser($user);
                $cmd->setQuantite($item['qte']);
                $cmd->setDate(new \DateTime('now'));
                $cmd->setEtat("En cours");
                $cmd->setSupp(false);
                $em->persist($cmd);
                $em->flush();

            }}
            $cc = $em->getRepository('AppBundle:CommandeGMS')->findBy(array('etat'=>'En cours', 'idUser'=>$user));
            $message = (new \Swift_Message('Nouvelle commande'))
                ->setFrom($user->getEmail())
                ->setTo('noreplymipa@gmail.com')//email mipa
                ->setBody($this->renderView('Admin/commande.email.twig', [
                    'user' => $user,
                    'cc' => $cc,
                    'total' => $total
                ]), 'text/html');
            $mailer->send($message);

            $message1 = (new \Swift_Message('Récapitulatif commande'))
                ->setFrom('noreplymipa@gmail.com')
                ->setTo($user->getEmail())
                ->setBody($this->renderView('ProduitsGMS/commande.email.twig', [
                    'user' => $user,
                    'cc' => $cc,
                    'total' => $total
                ]), 'text/html');
            $mailer->send($message1);

            $jsonData = 'success';
            $session->set('panierGMS', []);
        }else{
            $jsonData = 'failed';
        }
        return new JsonResponse($jsonData);
    }

    public function afficheCmdGMSAction(Request $request){

        $em = $this->getDoctrine()->getManager();
        $user = $request->getSession()->get('user');
        $cmd = $em->getRepository('AppBundle:CommandeGMS')->cmdOrderByDate($user->getId());
        return $this->render('ProduitsGMS/afficheCmd.html.twig',array('cmd'=>$cmd, 'user'=>$user));
    }

    public function supprimerCmdGMSAction(Request $request, $id){

        $em = $this->getDoctrine()->getManager();
        $cmd = $em->getRepository("AppBundle:CommandeGMS")->find($id);
        $cmd->setSupp(1);
        $em->persist($cmd);
        $em->flush();
        return $this->redirectToRoute('affiche_cmd_gms');
    }

}