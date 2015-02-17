<?php
namespace GalleryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Hateoas\Configuration\Annotation as Hateoas;
use JMS\Serializer\Annotation as Serializer;
use uebb\HateoasBundle\Annotation as UebbHateoas;
use uebb\HateoasBundle\Entity\File;

/**
 * Class Image
 *
 * @ORM\Entity
 * @Hateoas\RelationProvider("uebb.hateoas.relation_provider:addRelations")
 * @Serializer\ExclusionPolicy("all")
 */
class Image extends File
{
    /**
     * @var string
     *
     * @ORM\Column(type="string")
     * @Serializer\Expose
     *
     * @UebbHateoas\FormField
     */
    protected $description;

    /**
     * @var Gallery
     *
     * @ORM\ManyToOne(targetEntity="Gallery", inversedBy="images")
     */
    protected $gallery;
    

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
     * @return Gallery
     */
    public function getGallery()
    {
        return $this->gallery;
    }

    /**
     * @param Gallery $gallery
     */
    public function setGallery($gallery)
    {
        $this->gallery = $gallery;
    }
}