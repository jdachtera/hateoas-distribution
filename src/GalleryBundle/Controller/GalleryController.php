<?php

namespace GalleryBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use uebb\HateoasBundle\Controller\HateoasController;

class GalleryController extends HateoasController
{
    protected $entityName = 'GalleryBundle:Gallery';
}


