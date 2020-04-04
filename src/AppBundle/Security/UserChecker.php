<?php


namespace AppBundle\Security;


use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Exception\AccountStatusException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{

    /**
     * Checks the user account before authentication.
     *
     * @throws AccountStatusException
     */
    public function checkPreAuth(UserInterface $user)
    {

        if (!$user instanceof User) {
            return;
        }
        if ($user->getEnabled() == 0) {
            throw new CustomUserMessageAuthenticationException(
                'Votre compte n\'est pas encore actif, veuiller vérifier vos emails et activer votre compte.');
        }    }

    /**
     * Checks the user account after authentication.
     *
     * @throws AccountStatusException
     */
    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return;
        }
    }
}