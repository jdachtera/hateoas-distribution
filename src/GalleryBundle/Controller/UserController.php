<?php

namespace GalleryBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use uebb\HateoasBundle\Controller\HateoasController;

class UserController extends HateoasController
{
    protected $entityName = 'GalleryBundle:User';
}


