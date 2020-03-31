<?php

namespace AppBundle\Repository;

/**
 * UserParticulierRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserParticulierRepository extends \Doctrine\ORM\EntityRepository
{
    public function getNb(){
        $query = $this->getEntityManager()->createQuery('select COUNT (u.id) from AppBundle:UserParticulier u 
        where u.etat = :e')
            ->setParameter('e',false);
        return $query->getSingleScalarResult();
    }

    public function byNomEntreprise($search){
        $query = $this::createQueryBuilder('p')
            ->where('p.nomEntreprise like :nomEntreprise')
            ->setParameter('nomEntreprise','%'.$search.'%')
            ->getQuery();
        return $query->getResult();
    }
}
