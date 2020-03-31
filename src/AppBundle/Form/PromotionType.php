<?php


namespace AppBundle\Form;


use AppBundle\Entity\Produit_GMS;
use AppBundle\Entity\Produit_Particulier;
use AppBundle\Repository\Produit_GMSRepository;
use AppBundle\Repository\Produit_ParticulierRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PromotionType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pourcentage', NumberType::class, ['required'=>true, 'label'=>'Pourcentage', 'attr'=>['class'=>'form-control']])
            ->add('description', TextType::class, ['required'=>true, 'label'=>'Description', 'attr'=>['class'=>'form-control']])

        ;

    }
 /**
 * {@inheritdoc}
 */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Promotion'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_promotion';
    }

}