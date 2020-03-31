<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Produit_GMSType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('libelle', TextType::class, ['required'=>true, 'label'=>'Libelle', 'attr'=>['class'=>'form-control']])
                ->add('description', TextareaType::class, ['required'=>true, 'label'=>'Description', 'attr'=>['class'=>'form-control']])
                ->add('filename', FileType::class, array(
                    'label' => 'Insérez une image',
                    'required' => false,

                ))
                ->add('reference', TextType::class, ['required'=>true, 'label'=>'Référence', 'attr'=>['class'=>'form-control']])
                ->add('prix', TextType::class, ['required'=>true, 'label'=>'Prix', 'attr'=>['class'=>'form-control']])
        ;

    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Produit_GMS'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_produit_gms';
    }


}
