<?php

namespace AppBundle\Repository;

/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends \Doctrine\ORM\EntityRepository
{
    public function byEmail($search){
        $query = $this::createQueryBuilder('p')
            ->where('p.email like :email')
            ->setParameter('email','%'.$search.'%')
            ->getQuery();
        return $query->getResult();
    }
}
