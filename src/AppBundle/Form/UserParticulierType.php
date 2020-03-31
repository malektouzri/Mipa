<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserParticulierType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom', TextType::class,[
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('prenom', TextType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('adresse', TextareaType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('telephone', TelType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('email', EmailType::class,[
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('username', TextType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les mots de passe doivent correspondre.',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'first_options'  => ['label' => 'Mot de passe'],
                'second_options' => ['label' => 'Répétez mot de passe'],
            ])
            ->add('nomEntreprise', TextType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('adresseEntreprise', TextareaType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('emailEntreprise', EmailType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('telephoneEntreprise', TelType::class, [
                'required'=> true,
                'attr'=> ['class'=>'form-control']
            ])
            ->add('submit', SubmitType::class)
        ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\UserParticulier'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_userparticulier';
    }


}
