<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use uebb\HateoasBundle\Controller\HateoasController;

class UserController extends HateoasController
{
    protected $entityName = 'AppBundle:User';
}


