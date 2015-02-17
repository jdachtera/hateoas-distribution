<?php
/**
 * Created by PhpStorm.
 * User: jascha
 * Date: 11.02.15
 * Time: 16:27
 */

namespace GalleryBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Hateoas\Configuration\Annotation as Hateoas;
use JMS\Serializer\Annotation as Serializer;
use uebb\HateoasBundle\Annotation as UebbHateoas;
use uebb\HateoasBundle\Entity\Resource;


/**
 * Class Gallery
 *
 * @ORM\Entity
 * @Hateoas\RelationProvider("uebb.hateoas.relation_provider:addRelations")
 * @Serializer\ExclusionPolicy("all")
 */
class Gallery extends Resource
{

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Serializer\Expose
     * @UebbHateoas\FormField
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Serializer\Expose
     * @UebbHateoas\FormField
     */
    protected $description;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="galleries")
     */
    protected $user;

    /**
     * @var ArrayCollection<Image>
     *
     * @ORM\OneToMany(targetEntity="Image", mappedBy="gallery")
     */
    protected $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return ArrayCollection
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * @param ArrayCollection $images
     */
    public function setImages($images)
    {
        $this->images = $images;
    }

    /**
     * @param Image $image
     */
    public function addImage(Image $image)
    {
        $this->images->add($image);
    }

    /**
     * @param Image $image
     */
    public function removeImage(Image $image)
    {
        $this->images->removeElement($image);
    }


}