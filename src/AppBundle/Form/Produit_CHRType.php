<?php


namespace AppBundle\Form;


use AppBundle\Entity\Categorie_Particulier;
use AppBundle\Repository\Categorie_ParticulierRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Produit_CHRType extends AbstractType
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
            ->add('categories', EntityType::class, [
                'class' => Categorie_Particulier::class,
                'query_builder' => function (Categorie_ParticulierRepository $cat) {
                    return $cat->createQueryBuilder('c')
                        ->orderBy('c.nom', 'ASC');
                },
                'choice_label' => 'nom',
            ])
        ;

    }/**
 * {@inheritdoc}
 */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Produit_Particulier'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_produit_particulier';
    }

}