<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use uebb\HateoasBundle\Controller\HateoasController;

class UserController extends HateoasController
{
    protected $entityName = 'AppBundle:User';
}


