<?php
/**
 * Created by PhpStorm.
 * User: jascha
 * Date: 31.01.15
 * Time: 18:21
 */

namespace BackendBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Tests\Encoder\PasswordEncoder;
use Symfony\Component\Security\Core\User\UserInterface;
use uebb\HateoasBundle\Entity\Resource;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Hateoas\Configuration\Annotation as Hateoas;
use Symfony\Component\Validator\Constraints as Assert;

use uebb\HateoasBundle\Annotation as UebbHateoas;
use Knp\JsonSchemaBundle\Annotations as Json;

/**
 * Class User

 * @ORM\Entity
 * @Hateoas\RelationProvider("uebb.hateoas.relation_provider:addRelations")
 * @Serializer\ExclusionPolicy("all")
 * @Json\Schema("user")
 */
class User extends \uebb\HateoasBundle\Entity\User
{

    /**
     * @var ArrayCollection<Gallery>
     * @ORM\OneToMany(targetEntity="Gallery", mappedBy="user")
     * @UebbHateoas\QueryAble(maxDepth=1)
     */
    protected $galleries;

    /**
     * @return ArrayCollection
     */
    public function getGalleries()
    {
        return $this->galleries;
    }

    /**
     * @param ArrayCollection $galleries
     */
    public function setGalleries($galleries)
    {
        $this->galleries = $galleries;
    }

    /**
     * @param Gallery $gallery
     */
    public function addGallery(Gallery $gallery)
    {
        $this->galleries->add($gallery);
    }

    /**
     * @param Gallery $gallery
     */
    public function removeGallery(Gallery $gallery)
    {
        $this->galleries->removeElement($gallery);
    }

}