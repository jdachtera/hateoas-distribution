<?php

namespace GalleryBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use uebb\HateoasBundle\Controller\HateoasController;

class ImageController extends HateoasController
{
    protected $entityName = 'GalleryBundle:Image';
}


