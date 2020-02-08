<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Particulier
 *
 * @ORM\Table(name="particulier")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ParticulierRepository")
 */
class Particulier
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=255)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=255)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="entreprise", type="string", length=255)
     */
    private $entreprise;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone_fixe", type="string", length=255)
     */
    private $telephoneFixe;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone_mobile", type="string", length=255)
     */
    private $telephoneMobile;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone_fax", type="string", length=255)
     */
    private $telephoneFax;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse_entreprise", type="string", length=255)
     */
    private $adresseEntreprise;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse_mail_perso", type="string", length=255)
     */
    private $adresseMailPerso;

    /**
     * @var string
     *
     * @ORM\Column(name="adresse_mail_scte", type="string", length=255)
     */
    private $adresseMailScte;

    /**
     * @var string
     *
     * @ORM\Column(name="filename", type="string", length=255)
     */
    private $filename;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;

    /**
     * @var bool
     *
     * @ORM\Column(name="etat", type="boolean")
     */
    private $etat;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nom
     *
     * @param string $nom
     *
     * @return Particulier
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set prenom
     *
     * @param string $prenom
     *
     * @return Particulier
     */
    public function setPrenom($prenom)
    {
        $this->prenom = $prenom;

        return $this;
    }

    /**
     * Get prenom
     *
     * @return string
     */
    public function getPrenom()
    {
        return $this->prenom;
    }

    /**
     * Set entreprise
     *
     * @param string $entreprise
     *
     * @return Particulier
     */
    public function setEntreprise($entreprise)
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    /**
     * Get entreprise
     *
     * @return string
     */
    public function getEntreprise()
    {
        return $this->entreprise;
    }

    /**
     * Set telephoneFixe
     *
     * @param string $telephoneFixe
     *
     * @return Particulier
     */
    public function setTelephoneFixe($telephoneFixe)
    {
        $this->telephoneFixe = $telephoneFixe;

        return $this;
    }

    /**
     * Get telephoneFixe
     *
     * @return string
     */
    public function getTelephoneFixe()
    {
        return $this->telephoneFixe;
    }

    /**
     * Set telephoneMobile
     *
     * @param string $telephoneMobile
     *
     * @return Particulier
     */
    public function setTelephoneMobile($telephoneMobile)
    {
        $this->telephoneMobile = $telephoneMobile;

        return $this;
    }

    /**
     * Get telephoneMobile
     *
     * @return string
     */
    public function getTelephoneMobile()
    {
        return $this->telephoneMobile;
    }

    /**
     * Set telephoneFax
     *
     * @param string $telephoneFax
     *
     * @return Particulier
     */
    public function setTelephoneFax($telephoneFax)
    {
        $this->telephoneFax = $telephoneFax;

        return $this;
    }

    /**
     * Get telephoneFax
     *
     * @return string
     */
    public function getTelephoneFax()
    {
        return $this->telephoneFax;
    }

    /**
     * Set adresseEntreprise
     *
     * @param string $adresseEntreprise
     *
     * @return Particulier
     */
    public function setAdresseEntreprise($adresseEntreprise)
    {
        $this->adresseEntreprise = $adresseEntreprise;

        return $this;
    }

    /**
     * Get adresseEntreprise
     *
     * @return string
     */
    public function getAdresseEntreprise()
    {
        return $this->adresseEntreprise;
    }

    /**
     * Set adresseMailPerso
     *
     * @param string $adresseMailPerso
     *
     * @return Particulier
     */
    public function setAdresseMailPerso($adresseMailPerso)
    {
        $this->adresseMailPerso = $adresseMailPerso;

        return $this;
    }

    /**
     * Get adresseMailPerso
     *
     * @return string
     */
    public function getAdresseMailPerso()
    {
        return $this->adresseMailPerso;
    }

    /**
     * Set adresseMailScte
     *
     * @param string $adresseMailScte
     *
     * @return Particulier
     */
    public function setAdresseMailScte($adresseMailScte)
    {
        $this->adresseMailScte = $adresseMailScte;

        return $this;
    }

    /**
     * Get adresseMailScte
     *
     * @return string
     */
    public function getAdresseMailScte()
    {
        return $this->adresseMailScte;
    }

    /**
     * Set filename
     *
     * @param string $filename
     *
     * @return Particulier
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get filename
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Particulier
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set etat
     *
     * @param boolean $etat
     *
     * @return Particulier
     */
    public function setEtat($etat)
    {
        $this->etat = $etat;

        return $this;
    }

    /**
     * Get etat
     *
     * @return bool
     */
    public function getEtat()
    {
        return $this->etat;
    }
}

